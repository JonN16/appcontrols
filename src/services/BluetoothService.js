// BluetoothService.js
import RNBluetoothClassic from 'react-native-bluetooth-classic';

class BluetoothService {
  constructor() {
    this.connectedDevice = null;
    this.isConnecting = false;
    this.dataListeners = [];
  }

  async isEnabled() {
    try {
      return await RNBluetoothClassic.isBluetoothEnabled();
    } catch (error) {
      console.error('Erro ao verificar Bluetooth:', error);
      throw error;
    }
  }

  async getBondedDevices() {
    try {
      return await RNBluetoothClassic.getBondedDevices();
    } catch (error) {
      console.error('Erro ao buscar dispositivos:', error);
      throw error;
    }
  }

  async connectToDevice(address) {
    if (this.isConnecting) {
      throw new Error('Já existe uma tentativa de conexão em andamento');
    }

    try {
      this.isConnecting = true;
      
      // Desconectar dispositivo anterior se existir
      if (this.connectedDevice) {
        await this.disconnect();
      }

      console.log(`Tentando conectar ao dispositivo: ${address}`);
      
      // Configuração da conexão com timeout e retry
      const device = await this.connectWithRetry(address, 3);
      
      if (device && device.isConnected()) {
        this.connectedDevice = device;
        console.log(`Conectado com sucesso ao dispositivo: ${device.name || address}`);
        
        // Configurar listener para dados recebidos
        this.setupDataListener(device);
        
        return device;
      } else {
        throw new Error('Falha na conexão: dispositivo não conectado');
      }
      
    } catch (error) {
      console.error('Erro ao conectar:', error);
      this.connectedDevice = null;
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  async connectWithRetry(address, maxRetries) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Tentativa de conexão ${attempt}/${maxRetries}`);
        
        // Usar connectToDevice com timeout
        const device = await Promise.race([
          RNBluetoothClassic.connectToDevice(address, {
            delimiter: '\n',
            charset: 'utf-8'
          }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout na conexão')), 10000)
          )
        ]);

        if (device && device.isConnected()) {
          return device;
        }
        
      } catch (error) {
        lastError = error;
        console.warn(`Tentativa ${attempt} falhou:`, error.message);
        
        if (attempt < maxRetries) {
          // Aguardar antes da próxima tentativa
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    throw lastError || new Error('Falha em todas as tentativas de conexão');
  }

  setupDataListener(device) {
    try {
      // Configurar listener para dados recebidos
      const subscription = device.onDataReceived((data) => {
        console.log('Dados recebidos do Arduino:', data.data);
        
        // Notificar todos os listeners registrados
        this.dataListeners.forEach(listener => {
          try {
            listener(data);
          } catch (error) {
            console.error('Erro no listener de dados:', error);
          }
        });
      });

      // Armazenar a subscription para limpeza posterior
      device._dataSubscription = subscription;
      
    } catch (error) {
      console.error('Erro ao configurar listener de dados:', error);
    }
  }

  // Registrar callback para receber dados
  addDataListener(callback) {
    if (typeof callback === 'function') {
      this.dataListeners.push(callback);
      console.log('Listener de dados adicionado');
    }
  }

  // Remover callback de dados
  removeDataListener(callback) {
    const index = this.dataListeners.indexOf(callback);
    if (index > -1) {
      this.dataListeners.splice(index, 1);
      console.log('Listener de dados removido');
    }
  }

  // Limpar todos os listeners
  clearDataListeners() {
    this.dataListeners = [];
    console.log('Todos os listeners de dados foram removidos');
  }

  async sendCommand(device, command) {
    try {
      // Usar o dispositivo conectado atual
      const targetDevice = this.connectedDevice;
      
      if (!targetDevice) {
        throw new Error("Nenhum dispositivo conectado");
      }

      if (!targetDevice.isConnected()) {
        throw new Error("Dispositivo desconectado");
      }

      console.log(`Enviando comando: ${command}`);
      
      // Adicionar quebra de linha ao comando se necessário
      const commandWithNewline = command.endsWith('\n') ? command : command + '\n';
      
      const result = await targetDevice.write(commandWithNewline);
      console.log(`Comando enviado com sucesso: ${command}`);
      
      return result;
      
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
      
      // Se houve erro de conexão, tentar reconectar
      if (error.message.includes('socket') || error.message.includes('connection')) {
        console.log('Tentando reconexão...');
        this.connectedDevice = null;
      }
      
      throw error;
    }
  }

  async sendMessage(message) {
    return await this.sendCommand(null, message);
  }

  async disconnect() {
    try {
      if (this.connectedDevice) {
        console.log('Desconectando dispositivo...');
        
        // Limpar subscription de dados se existir
        if (this.connectedDevice._dataSubscription) {
          this.connectedDevice._dataSubscription.remove();
          delete this.connectedDevice._dataSubscription;
        }
        
        if (this.connectedDevice.isConnected()) {
          await this.connectedDevice.disconnect();
        }
        
        this.connectedDevice = null;
        
        // Limpar listeners
        this.clearDataListeners();
        
        console.log('Dispositivo desconectado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao desconectar:', error);
      this.connectedDevice = null;
      this.clearDataListeners();
      throw error;
    }
  }

  getConnectedDevice() {
    return this.connectedDevice;
  }

  isConnected() {
    return this.connectedDevice && this.connectedDevice.isConnected();
  }

  async checkConnection() {
    if (this.connectedDevice) {
      try {
        return this.connectedDevice.isConnected();
      } catch (error) {
        console.warn('Erro ao verificar conexão:', error);
        this.connectedDevice = null;
        this.clearDataListeners();
        return false;
      }
    }
    return false;
  }

  // Método para enviar comandos específicos de cada jogo
  async sendGameCommand(gameType, action) {
    const commandMap = {
      snake: {
        up: 'W',
        down: 'S',
        left: 'A',
        right: 'D'
      },
      tetris: {
        left: 'A',
        right: 'D',
        rotateLeft: 'Q',
        rotateRight: 'W',
        drop: 'S'
      },
      pong: {
        leftUp: 'W',
        leftDown: 'S',
        rightUp: 'W',
        rightDown: 'S'
      },
      breakout: {
        left: 'A',
        right: 'D'
      }
    };

    const command = commandMap[gameType]?.[action];
    if (command) {
      return await this.sendCommand(null, command);
    } else {
      throw new Error(`Comando não encontrado para o jogo ${gameType} e ação ${action}`);
    }
  }

  // Método para solicitar informações do Arduino
  async requestGameInfo() {
    return await this.sendCommand(null, 'INFO');
  }

  // Método para solicitar troca de jogo (se implementado no Arduino)
  async requestGameChange(gameType) {
    const gameCommands = {
      snake: 'GAME_SNAKE',
      tetris: 'GAME_TETRIS',
      pong: 'GAME_PONG',
      breakout: 'GAME_BREAKOUT'
    };

    const command = gameCommands[gameType];
    if (command) {
      return await this.sendCommand(null, command);
    } else {
      throw new Error(`Jogo não reconhecido: ${gameType}`);
    }
  }
}

export default new BluetoothService();