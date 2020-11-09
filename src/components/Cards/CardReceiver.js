import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {colors, fonts} from '../../helpers/constants';

const CardReceiver = React.memo((props) => {
  const {style, onPress, rippleColor, src, name, phone, ...card} = props;
  return (
    <RectButton
      {...card}
      rippleColor={rippleColor ? rippleColor : colors.rippleDark}
      onPress={onPress}
      style={[styles.receiverCard, style]}>
      <Image
        source={src ? src : require('../../assets/images/default.png')}
        style={styles.receiverPhoto}
      />
      <View style={styles.receiverProfile}>
        <Text style={styles.receiverName}>{name}</Text>
        <Text style={styles.receiverPhone}>{phone}</Text>
      </View>
    </RectButton>
  );
});

export default CardReceiver;

const styles = StyleSheet.create({
  receiverCard: {
    borderRadius: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  receiverSideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  receiverProfile: {
    marginLeft: 15,
  },
  receiverName: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  receiverPhone: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: 14,
  },
  receiverAmountUp: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.success,
  },
  receiverAmountDown: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.error,
  },
  receiverPhoto: {
    height: 56,
    width: 56,
  },
});
