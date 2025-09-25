import { StyleSheet } from 'react-native';

export const breakoutStyles = StyleSheet.create({
  // Controles do Breakout (modo paisagem) - Design baseado na imagem
  breakoutControlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 60,
  },
  breakoutButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    marginHorizontal: 40,
  },
  breakoutButtonLeft: {
    backgroundColor: '#00BCD4', // Azul ciano como na imagem
  },
  breakoutButtonRight: {
    backgroundColor: '#F44336', // Vermelho como na imagem
  },
  breakoutCenterLabel: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 15,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  breakoutLabelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});