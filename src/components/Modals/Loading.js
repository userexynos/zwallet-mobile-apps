import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../helpers/constants';

const Loading = ({show}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      hardwareAccelerated={true}
      visible={show}>
      <View style={styles.modalContainer}>
        <View style={styles.modalLoadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.rippleDark,
  },
  modalLoadingContainer: {
    width: 150,
    height: 150,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
