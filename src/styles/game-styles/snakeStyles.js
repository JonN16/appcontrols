import { StyleSheet } from 'react-native';

export const snakeStyles = StyleSheet.create({
  // Controles do Snake - Swipe area (modo retrato)
  snakeControlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 350,
  },
  snakeSwipeArea: {
    width: 300,
    height: 300,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#8B1538',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  snakeInstructions: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  snakeSubtext: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});