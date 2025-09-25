import React, { useState, useEffect } from 'react';
import { View, Alert, StatusBar } from 'react-native';
import BluetoothService from './src/services/BluetoothService';
import Controls from './src/components/Controls';
import { styles } from './src/styles/styles';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [currentGame, setCurrentGame] = useState('snake'); 
  const [incomingData, setIncomingData] = useState('');

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const isConnected = await BluetoothService.checkConnection();
        if (!isConnected && connectedDevice) {
          setConnectedDevice(null);
          setConnectionStatus('disconnected');
        }
      } catch (error) {
        console.warn('Erro ao verificar status da conexão:', error);
      }
    };

    // Escutar dados recebidos do Arduino
    const listenForData = () => {
      if (connectedDevice && connectedDevice.connection) {
        try {
          connectedDevice.connection.onDataReceived((data) => {
            console.log('Dados recebidos do Arduino:', data);
            handleArduinoData(data.data);
          });
        } catch (error) {
          console.warn('Erro ao configurar listener de dados:', error);
        }
      }
    };

    const interval = setInterval(checkConnectionStatus, 5000);
    
    if (connectedDevice) {
      listenForData();
    }

    return () => clearInterval(interval);
  }, [connectedDevice]);

  // Processar dados recebidos do Arduino
  const handleArduinoData = (data) => {
    try {
      setIncomingData(data);
      
      // Verificar se é um comando de troca de jogo
      if (data.includes('GAME:')) {
        const gameCommand = data.split('GAME:')[1].trim().toLowerCase();
        console.log('Comando de jogo recebido:', gameCommand);
        
        switch (gameCommand) {
          case 'snake':
            setCurrentGame('snake');
            break;
          case 'tetris':
            setCurrentGame('tetris');
            break;
          case 'pong':
            setCurrentGame('pong');
            break;
          case 'breakout':
            setCurrentGame('breakout');
            break;
          default:
            console.warn('Jogo não reconhecido:', gameCommand);
        }
      }
      
      // Outros tipos de dados podem ser processados aqui
      
    } catch (error) {
      console.error('Erro ao processar dados do Arduino:', error);
    }
  };

  const scanDevices = async () => {
    setScanning(true);
    setShowDeviceModal(true);
    setDevices([]);
    
    try {
      const enabled = await BluetoothService.isEnabled();
      if (!enabled) {
        Alert.alert(
          'Bluetooth Desabilitado', 
          'Por favor, ative o Bluetooth e tente novamente.',
          [
            { text: 'OK', onPress: () => setShowDeviceModal(false) }
          ]
        );
        setScanning(false);
        return;
      }

      console.log('Buscando dispositivos pareados...');
      const bonded = await BluetoothService.getBondedDevices();
      console.log(`Encontrados ${bonded.length} dispositivos pareados`);
      
      setDevices(bonded);
    } catch (error) {
      console.error('Erro ao buscar dispositivos:', error);
      Alert.alert('Erro', `Falha ao buscar dispositivos: ${error.message}`);
    }
    setScanning(false);
  };

  const connectToDevice = async (device) => {
    if (connecting) return;
    
    setConnecting(true);
    setConnectionStatus('connecting');
    
    try {
      console.log(`Tentando conectar ao dispositivo: ${device.name || device.address}`);
      
      const connection = await BluetoothService.connectToDevice(device.address);
      
      if (connection && BluetoothService.isConnected()) {
        setConnectedDevice({
          ...device,
          connection: connection
        });
        setConnectionStatus('connected');
        setShowDeviceModal(false);
        
        Alert.alert(
          'Conexão Estabelecida', 
          `Conectado ao dispositivo: ${device.name || device.address}`
        );
        
        console.log('Conexão estabelecida com sucesso');
      } else {
        throw new Error('Falha na verificação da conexão');
      }
      
    } catch (error) {
      console.error('Erro de conexão:', error);
      setConnectedDevice(null);
      setConnectionStatus('disconnected');
      
      let errorMessage = 'Falha ao conectar ao dispositivo';
      
      if (error.message.includes('timeout')) {
        errorMessage = 'Timeout na conexão. Verifique se o dispositivo está próximo e disponível.';
      } else if (error.message.includes('socket')) {
        errorMessage = 'Erro de comunicação. Tente novamente ou reinicie o Bluetooth.';
      } else if (error.message.includes('IOException')) {
        errorMessage = 'Erro de E/O. Verifique se o dispositivo está ligado e acessível.';
      }
      
      Alert.alert('Erro de Conexão', errorMessage);
    }
    
    setConnecting(false);
  };

  const sendCommand = async (command) => {
    if (!connectedDevice) {
      Alert.alert('Erro', 'Nenhum dispositivo conectado');
      return;
    }
    
    try {
      await BluetoothService.sendCommand(null, command);
      console.log(`Comando enviado: ${command}`);
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
      
      if (error.message.includes('desconectado') || error.message.includes('socket')) {
        setConnectedDevice(null);
        setConnectionStatus('disconnected');
        Alert.alert('Conexão Perdida', 'A conexão com o dispositivo foi perdida. Reconecte para continuar.');
      } else {
        Alert.alert('Erro', `Falha ao enviar comando: ${error.message}`);
      }
    }
  };

  const disconnectDevice = async () => {
    try {
      await BluetoothService.disconnect();
      setConnectedDevice(null);
      setConnectionStatus('disconnected');
      setCurrentGame('snake'); // Reset para o jogo padrão
      console.log('Dispositivo desconectado pelo usuário');
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  };

  const closeModal = () => {
    setShowDeviceModal(false);
    setDevices([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Controls
        currentGame={currentGame}
        connectedDevice={connectedDevice}
        connectionStatus={connectionStatus}
        sendCommand={sendCommand}
        onScanDevices={scanDevices}
        onDisconnect={disconnectDevice}
        scanning={scanning}
        devices={devices}
        showDeviceModal={showDeviceModal}
        connecting={connecting}
        onConnectToDevice={connectToDevice}
        onCloseModal={closeModal}
      />
    </View>
  );
};

export default App;