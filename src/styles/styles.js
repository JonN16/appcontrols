// Arquivo principal que combina todos os estilos
import { baseStyles } from './base/baseStyles';
import { snakeStyles } from './game-styles/snakeStyles';
import { tetrisStyles } from './game-styles/tetrisStyles';
import { pongStyles } from './game-styles/pongStyles';
import { breakoutStyles } from './game-styles/breakoutStyles';
import { deviceStyles } from './device/deviceStyles';

// Combinar todos os estilos em um objeto único
export const styles = {
  ...baseStyles,
  ...snakeStyles,
  ...tetrisStyles,
  ...pongStyles,
  ...breakoutStyles,
  ...deviceStyles,
};