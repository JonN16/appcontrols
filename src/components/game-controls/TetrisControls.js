import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { tetrisStyles } from '../../styles/game-styles/tetrisStyles';
import { baseStyles } from '../../styles/base/baseStyles';

const TetrisControls = ({ connectedDevice, sendCommand }) => {
  const [pressedButtons, setPressedButtons] = useState({
    left: false,
    right: false,
    drop: false,
    rotateLeft: false,
    rotateRight: false
  });

  const handleButtonPress = (buttonKey, command) => {
    if (!connectedDevice) {
      Alert.alert('Aviso', 'Conecte-se a um dispositivo primeiro');
      return;
    }
    
    console.log(`Botão ${buttonKey} pressionado - Comando: ${command}`);
    setPressedButtons(prev => ({ ...prev, [buttonKey]: true }));
    
    sendCommand(command);
    
    setTimeout(() => {
      setPressedButtons(prev => ({ ...prev, [buttonKey]: false }));
    }, 150);
  };

  return (
    <View style={tetrisStyles.tetrisControlsContainer}>
      {/* Controles da Esquerda */}
      <View style={tetrisStyles.leftCorner}>
        <TouchableOpacity
          style={[
            tetrisStyles.tetrisCornerButton,
            tetrisStyles.dropButtonStyle,
            pressedButtons.drop && baseStyles.controlButtonPressed,
            !connectedDevice && baseStyles.controlButtonDisabled
          ]}
          onPress={() => handleButtonPress('drop', 'S')}
          disabled={!connectedDevice}
        >
          <Text style={[tetrisStyles.cornerButtonText, !connectedDevice && baseStyles.arrowDisabled]}>▼</Text>
        </TouchableOpacity>

        <View style={tetrisStyles.tetrisDirectionalButtons}>
          <TouchableOpacity
            style={[
              tetrisStyles.tetrisCornerButton,
              tetrisStyles.leftButtonStyle,
              pressedButtons.left && baseStyles.controlButtonPressed,
              !connectedDevice && baseStyles.controlButtonDisabled
            ]}
            onPress={() => handleButtonPress('left', 'A')}
            disabled={!connectedDevice}
          >
            <Text style={[tetrisStyles.cornerButtonText, !connectedDevice && baseStyles.arrowDisabled]}>◄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tetrisStyles.tetrisCornerButton,
              tetrisStyles.rotateLeftButtonStyle,
              pressedButtons.rotateLeft && baseStyles.controlButtonPressed,
              !connectedDevice && baseStyles.controlButtonDisabled
            ]}
            onPress={() => handleButtonPress('rotateLeft', 'Q')}
            disabled={!connectedDevice}
          >
            <Text style={[tetrisStyles.cornerButtonText, !connectedDevice && baseStyles.arrowDisabled]}>↺</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Controles da Direita */}
      <View style={tetrisStyles.rightCorner}>
        <TouchableOpacity
          style={[
            tetrisStyles.tetrisCornerButton,
            tetrisStyles.dropButtonStyle,
            pressedButtons.drop && baseStyles.controlButtonPressed,
            !connectedDevice && baseStyles.controlButtonDisabled
          ]}
          onPress={() => handleButtonPress('drop', 'S')}
          disabled={!connectedDevice}
        >
          <Text style={[tetrisStyles.cornerButtonText, !connectedDevice && baseStyles.arrowDisabled]}>▼</Text>
        </TouchableOpacity>

        <View style={tetrisStyles.tetrisDirectionalButtons}>
          <TouchableOpacity
            style={[
              tetrisStyles.tetrisCornerButton,
              tetrisStyles.rotateRightButtonStyle,
              pressedButtons.rotateRight && baseStyles.controlButtonPressed,
              !connectedDevice && baseStyles.controlButtonDisabled
            ]}
            onPress={() => handleButtonPress('rotateRight', 'W')}
            disabled={!connectedDevice}
          >
            <Text style={[tetrisStyles.cornerButtonText, !connectedDevice && baseStyles.arrowDisabled]}>↻</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tetrisStyles.tetrisCornerButton,
              tetrisStyles.rightButtonStyle,
              pressedButtons.right && baseStyles.controlButtonPressed,
              !connectedDevice && baseStyles.controlButtonDisabled
            ]}
            onPress={() => handleButtonPress('right', 'D')}
            disabled={!connectedDevice}
          >
            <Text style={[tetrisStyles.cornerButtonText, !connectedDevice && baseStyles.arrowDisabled]}>►</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Área Central - Será preenchida pelas informações do Controls.js */}
      <View style={tetrisStyles.centerArea}>
        {/* Esta área será ocupada pelas informações de conexão e jogo */}
      </View>
    </View>
  );
};

export default TetrisControls;