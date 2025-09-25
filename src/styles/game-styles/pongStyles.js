import { StyleSheet } from 'react-native';

export const pongStyles = StyleSheet.create({
  // Controles do Pong (modo paisagem) - Design baseado na imagem
  pongControlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    paddingHorizontal: 40,
  },
  pongLeftPaddle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 40,
  },
  pongRightPaddle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 40,
  },
  pongButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00BCD4', // Azul ciano como na imagem esquerda
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    marginVertical: 10,
  },
  pongButtonRight: {
    backgroundColor: '#F44336', // Vermelho como na imagem direita
  },
  pongCenterLabel: {
    backgroundColor: '#333',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  pongLabelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pongDivider: {
    height: 2,
    width: 60,
    backgroundColor: '#333',
    marginVertical: 15,
  },
});