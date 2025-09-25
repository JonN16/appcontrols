import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const deviceStyles = StyleSheet.create({
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    maxHeight: height * 0.8,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // Scanning
  scanningContainer: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  scanningText: {
    color: '#ccc',
    marginTop: 15,
    fontSize: 16,
  },
  
  // Lista de dispositivos
  devicesList: {
    maxHeight: height * 0.5,
  },
  deviceItem: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#8B1538',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceItemConnected: {
    backgroundColor: '#1a3d1a',
    borderLeftColor: '#4CAF50',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  deviceAddress: {
    color: '#aaa',
    fontSize: 14,
  },
  deviceClass: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  deviceLoader: {
    marginLeft: 15,
  },
  connectedIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  connectedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    paddingVertical: 40,
    lineHeight: 22,
  },
});