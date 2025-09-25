import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { pongStyles } from '../../styles/game-styles/pongStyles';
import { baseStyles } from '../../styles/base/baseStyles';

const PongControls = ({ connectedDevice, sendCommand }) => {
  const [pressedButtons, setPressedButtons] = useState({
    leftUp: false,
    leftDown: false,
    rightUp: false,
    rightDown: false
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
    <View style={pongStyles.pongControlsContainer}>
      {/* Paddle Esquerdo */}
      <View style={pongStyles.pongLeftPaddle}>
        <TouchableOpacity
          style={[
            pongStyles.pongButton,
            pressedButtons.leftUp && baseStyles.controlButtonPressed,
            !connectedDevice && baseStyles.controlButtonDisabled
          ]}
          onPress={() => handleButtonPress('leftUp', 'W')}
          disabled={!connectedDevice}
        >
          <Text style={[baseStyles.arrow, !connectedDevice && baseStyles.arrowDisabled]}>▲</Text>
        </TouchableOpacity>

        <View style={pongStyles.pongDivider} />

        <TouchableOpacity
          style={[
            pongStyles.pongButton,
            pressedButtons.leftDown && baseStyles.controlButtonPressed,
            !connectedDevice && baseStyles.controlButtonDisabled
          ]}
          onPress={() => handleButtonPress('leftDown', 'S')}
          disabled={!connectedDevice}
        >
          <Text style={[baseStyles.arrow, !connectedDevice && baseStyles.arrowDisabled]}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Centro */}
      <View style={pongStyles.pongCenterLabel}>
        <Text style={pongStyles.pongLabelText}>PADDLES</Text>
      </View>

      {/* Paddle Direito */}
      <View style={pongStyles.pongRightPaddle}>
        <TouchableOpacity
          style={[
            pongStyles.pongButton,
            pongStyles.pongButtonRight,
            pressedButtons.rightUp && baseStyles.controlButtonPressed,
            !connectedDevice && baseStyles.controlButtonDisabled
          ]}
          onPress={() => handleButtonPress('rightUp', 'A')}
          disabled={!connectedDevice}
        >
          <Text style={[baseStyles.arrow, !connectedDevice && baseStyles.arrowDisabled]}>▲</Text>
        </TouchableOpacity>

        <View style={pongStyles.pongDivider} />

        <TouchableOpacity
          style={[
            pongStyles.pongButton,
            pongStyles.pongButtonRight,
            pressedButtons.rightDown && baseStyles.controlButtonPressed,
            !connectedDevice && baseStyles.controlButtonDisabled
          ]}
          onPress={() => handleButtonPress('rightDown', 'D')}
          disabled={!connectedDevice}
        >
          <Text style={[baseStyles.arrow, !connectedDevice && baseStyles.arrowDisabled]}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PongControls;