import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const baseStyles = StyleSheet.create({
  // Estilos principais existentes...
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainInterface: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  
  // Layout para modo paisagem (jogos exceto Snake)
  mainInterfaceLandscape: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  // NOVOS ESTILOS PARA TETRIS
  // Container full-screen para Tetris
  tetrisFullScreenContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  // Área de informações centrais do Tetris
  tetrisCenterInfo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -100 }], // Ajustado para o novo tamanho
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    width: 150,
  },

  // Botão Bluetooth central para Tetris
  tetrisBluetoothButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff', // FUNDO BRANCO como pedido
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ddd',
  },

  // Ícone do Bluetooth para Tetris
  tetrisBluetoothIcon: {
    fontSize: 24,
    color: '#000', // ÍCONE PRETO no fundo branco
    fontWeight: 'bold',
  },

  // Título do jogo para Tetris - COM FUNDO
  tetrisGameTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#8B1538', // FUNDO igual antes
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },

  // Status de conexão para Tetris
  tetrisConnectionStatus: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: 120,
  },

  tetrisStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Botão de desconectar para Tetris
  tetrisDisconnectButton: {
    backgroundColor: '#8B1538',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  tetrisDisconnectText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Estilos existentes continuam...
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  
  leftSection: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  
  gameControlsSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  
  gameControlsSectionLandscape: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  
  bluetoothButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 15,
  },
  bluetoothButtonPressed: {
    backgroundColor: '#d0d0d0',
    transform: [{ scale: 0.95 }],
  },
  bluetoothButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  
  // Status de conexão
  connectionStatus: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  connectionStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  gameIndicator: {
    backgroundColor: '#8B1538',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 10,
  },
  gameIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Botão desconectar
  disconnectButton: {
    backgroundColor: '#8B1538',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  disconnectText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Estilos comuns para botões
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  controlButtonPressed: {
    transform: [{ scale: 0.95 }],
    shadowOpacity: 0.2,
    opacity: 0.8,
  },
  controlButtonDisabled: {
    backgroundColor: '#666',
    shadowOpacity: 0.1,
  },
  arrow: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  arrowDisabled: {
    color: '#999',
  },
  rotateIcon: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});