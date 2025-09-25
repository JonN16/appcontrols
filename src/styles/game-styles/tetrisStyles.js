import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const tetrisStyles = StyleSheet.create({
  // Container principal - agora ocupa toda a tela
  tetrisControlsContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10, // Reduzido para permitir botões mais próximos das bordas
  },

  // Controles da esquerda - posicionamento no canto extremo
  leftCorner: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -100 }], // Ajustado para centralizar verticalmente
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Controles da direita - posicionamento no canto extremo
  rightCorner: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -100 }], // Ajustado para centralizar verticalmente
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Botões direcionais (esquerda/direita e rotação)
  tetrisDirectionalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20, // Espaçamento entre botões
  },

  // Área central livre para informações
  centerArea: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  // Estilo base para botões dos cantos - MAIORES
  tetrisCornerButton: {
    width: 80, // Aumentado de 60 para 80
    height: 80, // Aumentado de 60 para 80
    borderRadius: 40, // Ajustado para manter proporção circular
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },

  // Cores específicas para cada tipo de botão
  dropButtonStyle: {
    backgroundColor: '#00BCD4', // Azul ciano para drop
  },

  leftButtonStyle: {
    backgroundColor: '#F44336', // Vermelho para movimento esquerda
  },

  rightButtonStyle: {
    backgroundColor: '#F44336', // Vermelho para movimento direita
  },

  rotateLeftButtonStyle: {
    backgroundColor: '#00BCD4', // Azul ciano para rotação esquerda
  },

  rotateRightButtonStyle: {
    backgroundColor: '#00BCD4', // Azul ciano para rotação direita
  },

  // Textos dos botões - MAIORES
  cornerButtonText: {
    fontSize: 36, // Aumentado de 28 para 36
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 