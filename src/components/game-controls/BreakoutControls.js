import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { breakoutStyles } from '../../styles/game-styles/breakoutStyles';
import { baseStyles } from '../../styles/base/baseStyles';

const BreakoutControls = ({ connectedDevice, sendCommand }) => {
  const [pressedButtons, setPressedButtons] = useState({
    left: false,
    right: false
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
    <View style={breakoutStyles.breakoutControlsContainer}>
      {/* Botão Esquerda */}
      <TouchableOpacity
        style={[
          breakoutStyles.breakoutButton,
          breakoutStyles.breakoutButtonLeft,
          pressedButtons.left && baseStyles.controlButtonPressed,
          !connectedDevice && baseStyles.controlButtonDisabled
        ]}
        onPress={() => handleButtonPress('left', 'A')}
        disabled={!connectedDevice}
      >
        <Text style={[baseStyles.arrow, !connectedDevice && baseStyles.arrowDisabled]}>◄</Text>
      </TouchableOpacity>

      {/* Centro */}
      <View style={breakoutStyles.breakoutCenterLabel}>
        <Text style={breakoutStyles.breakoutLabelText}>PADDLE</Text>
      </View>

      {/* Botão Direita */}
      <TouchableOpacity
        style={[
          breakoutStyles.breakoutButton,
          breakoutStyles.breakoutButtonRight,
          pressedButtons.right && baseStyles.controlButtonPressed,
          !connectedDevice && baseStyles.controlButtonDisabled
        ]}
        onPress={() => handleButtonPress('right', 'D')}
        disabled={!connectedDevice}
      >
        <Text style={[baseStyles.arrow, !connectedDevice && baseStyles.arrowDisabled]}>►</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BreakoutControls;