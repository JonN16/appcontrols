import React, { useState } from 'react';
import { View, Text, PanResponder, Alert } from 'react-native';
import { snakeStyles } from '../../styles/game-styles/snakeStyles';

const SnakeControls = ({ connectedDevice, sendCommand }) => {
  const [pressedButtons, setPressedButtons] = useState({
    up: false,
    down: false,
    left: false,
    right: false
  });
  
  const [swipeDirection, setSwipeDirection] = useState(null);

  // Função para processar o swipe e enviar comando
  const handleSwipeCommand = (direction) => {
    if (!connectedDevice) {
      Alert.alert('Aviso', 'Conecte-se a um dispositivo primeiro');
      return;
    }

    let command;
    let buttonKey;
    
    switch (direction) {
      case 'up':
        command = 'W';
        buttonKey = 'up';
        break;
      case 'down':
        command = 'S';
        buttonKey = 'down';
        break;
      case 'left':
        command = 'A';
        buttonKey = 'left';
        break;
      case 'right':
        command = 'D';
        buttonKey = 'right';
        break;
      default:
        return;
    }

    console.log(`Swipe ${direction} - Comando: ${command}`);
    
    // Mostrar feedback visual
    setSwipeDirection(direction);
    setPressedButtons(prev => ({ ...prev, [buttonKey]: true }));
    
    sendCommand(command);
    
    setTimeout(() => {
      setSwipeDirection(null);
      setPressedButtons(prev => ({ ...prev, [buttonKey]: false }));
    }, 200);
  };

  // PanResponder para detectar gestos de swipe
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
    },
    
    onPanResponderGrant: (evt, gestureState) => {
      // Início do gesto
    },
    
    onPanResponderMove: (evt, gestureState) => {
      // Durante o movimento
    },
    
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      const minDistance = 30;
      
      if (Math.abs(dx) < minDistance && Math.abs(dy) < minDistance) {
        return;
      }
      
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          handleSwipeCommand('right');
        } else {
          handleSwipeCommand('left');
        }
      } else {
        if (dy < 0) {
          handleSwipeCommand('up');
        } else {
          handleSwipeCommand('down');
        }
      }
    },
  });

  return (
    <View style={snakeStyles.snakeControlsContainer}>
      <View 
        style={[
          snakeStyles.snakeSwipeArea,
          { borderColor: connectedDevice ? '#8B1538' : '#333' }
        ]}
        {...panResponder.panHandlers}
      >
        {/* Indicador visual da direção */}
        {swipeDirection && (
          <View style={{
            position: 'absolute',
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#8B1538',
            alignItems: 'center',
            justifyContent: 'center',
            ...(swipeDirection === 'up' && { top: 20 }),
            ...(swipeDirection === 'down' && { bottom: 20 }),
            ...(swipeDirection === 'left' && { left: 20 }),
            ...(swipeDirection === 'right' && { right: 20 }),
          }}>
            <Text style={{ fontSize: 24, color: '#fff' }}>
              {swipeDirection === 'up' && '▲'}
              {swipeDirection === 'down' && '▼'}
              {swipeDirection === 'left' && '◄'}
              {swipeDirection === 'right' && '►'}
            </Text>
          </View>
        )}
        
        <Text style={[
          snakeStyles.snakeInstructions,
          { color: connectedDevice ? '#fff' : '#666' }
        ]}>
          🐍 SNAKE
        </Text>
        
        <Text style={[
          snakeStyles.snakeSubtext,
          { color: connectedDevice ? '#ccc' : '#555' }
        ]}>
          {connectedDevice 
            ? 'Arraste o dedo na tela para\ncontrolar a direção da cobra'
            : 'Conecte-se a um dispositivo\npara jogar'
          }
        </Text>

        {/* Indicadores de direção fixos */}
        <View style={{ position: 'absolute', top: 30, opacity: 0.3 }}>
          <Text style={{ fontSize: 20, color: '#8B1538' }}>▲</Text>
        </View>
        <View style={{ position: 'absolute', bottom: 30, opacity: 0.3 }}>
          <Text style={{ fontSize: 20, color: '#8B1538' }}>▼</Text>
        </View>
        <View style={{ position: 'absolute', left: 30, opacity: 0.3 }}>
          <Text style={{ fontSize: 20, color: '#8B1538' }}>◄</Text>
        </View>
        <View style={{ position: 'absolute', right: 30, opacity: 0.3 }}>
          <Text style={{ fontSize: 20, color: '#8B1538' }}>►</Text>
        </View>
      </View>
    </View>
  );
};

export default SnakeControls;