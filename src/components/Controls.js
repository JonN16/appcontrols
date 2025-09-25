import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { styles } from '../styles/styles';

// Importar os controles separados
import SnakeControls from './game-controls/SnakeControls';
import TetrisControls from './game-controls/TetrisControls';
import PongControls from './game-controls/PongControls';
import BreakoutControls from './game-controls/BreakoutControls';

const Controls = ({
  currentGame,
  connectedDevice,
  connectionStatus,
  sendCommand,
  onScanDevices,
  onDisconnect,
  scanning,
  devices,
  showDeviceModal,
  connecting,
  onConnectToDevice,
  onCloseModal
}) => {
  // Estado para indicar qual botão bluetooth está pressionado
  const [pressedButtons, setPressedButtons] = useState({
    bluetooth: false
  });

  // Controlar orientação da tela baseado no jogo
  useEffect(() => {
    if (currentGame === 'snake') {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }

    // Cleanup - permite rotação novamente quando o componente é desmontado
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, [currentGame]);

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#4CAF50';
      case 'connecting': return '#FF9800';
      default: return '#666';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return `${connectedDevice?.name || 'Conectado'}`;
      case 'connecting': return 'Conectando...';
      default: return 'Desconectado';
    }
  };

  const getGameTitle = () => {
    switch (currentGame) {
      case 'snake': return 'Snake';
      case 'tetris': return 'Tetris';
      case 'pong': return 'Pong';
      case 'breakout': return 'Breakout';
      default: return 'Game';
    }
  };

  // Componente de informações centrais para Tetris
  const renderTetrisCenterInfo = () => (
    <View style={styles.tetrisCenterInfo}>
      {/* Botão Bluetooth Central */}
      <TouchableOpacity 
        style={[
          styles.tetrisBluetoothButton,
          pressedButtons.bluetooth && styles.bluetoothButtonPressed
        ]} 
        onPress={() => {
          setPressedButtons(prev => ({ ...prev, bluetooth: true }));
          onScanDevices();
          setTimeout(() => {
            setPressedButtons(prev => ({ ...prev, bluetooth: false }));
          }, 150);
        }}
        disabled={scanning}
      >
        {scanning ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.tetrisBluetoothIcon}>📱</Text>
        )}
      </TouchableOpacity>

      {/* Nome do Jogo */}
      <Text style={styles.tetrisGameTitle}>
        🎮 {getGameTitle()}
      </Text>

      {/* Status de Conexão */}
      <View style={[styles.tetrisConnectionStatus, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.tetrisStatusText}>
          ● {getStatusText()}
        </Text>
      </View>

      {/* Botão de Desconectar */}
      {connectedDevice && (
        <TouchableOpacity 
          style={styles.tetrisDisconnectButton}
          onPress={onDisconnect}
        >
          <Text style={styles.tetrisDisconnectText}>Desconectar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Componente de status e controles laterais para outros jogos (paisagem)
  const renderSideControls = () => (
    <>
      <View style={styles.leftSection}>
        <TouchableOpacity 
          style={[
            styles.bluetoothButton,
            pressedButtons.bluetooth && styles.bluetoothButtonPressed
          ]} 
          onPress={() => {
            setPressedButtons(prev => ({ ...prev, bluetooth: true }));
            onScanDevices();
            setTimeout(() => {
              setPressedButtons(prev => ({ ...prev, bluetooth: false }));
            }, 150);
          }}
          disabled={scanning}
        >
          {scanning ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.bluetoothButtonText}>📱</Text>
          )}
        </TouchableOpacity>

        {/* Status de conexão */}
        <View style={[styles.connectionStatus, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.connectionStatusText}>
            {getStatusText()}
          </Text>
        </View>

        {/* Indicador do jogo atual */}
        <View style={styles.gameIndicator}>
          <Text style={styles.gameIndicatorText}>
            🎮 {getGameTitle()}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        {connectedDevice && (
          <TouchableOpacity 
            style={styles.disconnectButton}
            onPress={onDisconnect}
          >
            <Text style={styles.disconnectText}>Desconectar</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  // Renderizar o controle apropriado baseado no jogo atual
  const renderCurrentGameControls = () => {
    const gameProps = {
      connectedDevice,
      sendCommand
    };

    switch (currentGame) {
      case 'snake':
        return <SnakeControls {...gameProps} />;
      case 'tetris':
        return <TetrisControls {...gameProps} />;
      case 'pong':
        return <PongControls {...gameProps} />;
      case 'breakout':
        return <BreakoutControls {...gameProps} />;
      default:
        return <SnakeControls {...gameProps} />;
    }
  };

  const renderDeviceItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.deviceItem,
        connectedDevice?.address === item.address && styles.deviceItemConnected
      ]}
      onPress={() => onConnectToDevice(item)}
      disabled={connecting}
    >
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>
          {item.name || 'Dispositivo sem nome'}
        </Text>
        <Text style={styles.deviceAddress}>
          {item.address}
        </Text>
        {item.class && (
          <Text style={styles.deviceClass}>
            Classe: {item.class}
          </Text>
        )}
      </View>
      
      {connecting && connectedDevice?.address === item.address && (
        <ActivityIndicator size="small" color="#fff" style={styles.deviceLoader} />
      )}
      
      {connectedDevice?.address === item.address && !connecting && (
        <View style={styles.connectedIndicator}>
          <Text style={styles.connectedText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  // Determinar se usar layout paisagem ou retrato
  const isLandscapeGame = currentGame !== 'snake';
  const isTetris = currentGame === 'tetris';

  return (
    <View style={isLandscapeGame ? styles.mainInterfaceLandscape : styles.mainInterface}>
      {/* Layout especial para Tetris */}
      {isTetris && (
        <View style={styles.tetrisFullScreenContainer}>
          {/* Controles nos cantos */}
          {renderCurrentGameControls()}
          
          {/* Informações centrais */}
          {renderTetrisCenterInfo()}
        </View>
      )}

      {/* Layout para Snake (retrato) */}
      {!isLandscapeGame && (
        <>
          {/* Seção Superior - Bluetooth e Status */}
          <View style={styles.topSection}>
            <TouchableOpacity 
              style={[
                styles.bluetoothButton,
                pressedButtons.bluetooth && styles.bluetoothButtonPressed
              ]} 
              onPress={() => {
                setPressedButtons(prev => ({ ...prev, bluetooth: true }));
                onScanDevices();
                setTimeout(() => {
                  setPressedButtons(prev => ({ ...prev, bluetooth: false }));
                }, 150);
              }}
              disabled={scanning}
            >
              {scanning ? (
                <ActivityIndicator size="large" color="#000" />
              ) : (
                <Text style={styles.bluetoothButtonText}>📱</Text>
              )}
            </TouchableOpacity>

            {/* Status de conexão */}
            <View style={[styles.connectionStatus, { backgroundColor: getStatusColor() }]}>
              <Text style={styles.connectionStatusText}>
                {getStatusText()}
              </Text>
            </View>

            {/* Indicador do jogo atual */}
            <View style={styles.gameIndicator}>
              <Text style={styles.gameIndicatorText}>
                🎮 {getGameTitle()}
              </Text>
            </View>
          </View>

          {/* Seção Central - Controles do jogo atual */}
          <View style={styles.gameControlsSection}>
            {renderCurrentGameControls()}
          </View>

          {/* Seção Inferior - Botão de desconexão */}
          <View style={styles.bottomSection}>
            {connectedDevice && (
              <TouchableOpacity 
                style={styles.disconnectButton}
                onPress={onDisconnect}
              >
                <Text style={styles.disconnectText}>Desconectar</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {/* Layout para outros jogos (paisagem) - exceto Tetris */}
      {isLandscapeGame && !isTetris && (
        <>
          {renderSideControls()}
          
          {/* Seção Central - Controles do jogo atual */}
          <View style={styles.gameControlsSectionLandscape}>
            {renderCurrentGameControls()}
          </View>
        </>
      )}

      {/* Modal de dispositivos */}
      <Modal
        visible={showDeviceModal}
        transparent={true}
        animationType="slide"
        onRequestClose={onCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Dispositivos Bluetooth</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={onCloseModal}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            {scanning && (
              <View style={styles.scanningContainer}>
                <ActivityIndicator size="large" color="#8B1538" />
                <Text style={styles.scanningText}>Buscando dispositivos pareados...</Text>
              </View>
            )}

            <FlatList
              data={devices}
              renderItem={renderDeviceItem}
              keyExtractor={(item) => item.address}
              style={styles.devicesList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                !scanning && (
                  <Text style={styles.emptyText}>
                    Nenhum dispositivo pareado encontrado.{'\n'}
                    Pareie o dispositivo nas configurações do Bluetooth primeiro.
                  </Text>
                )
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Controls;