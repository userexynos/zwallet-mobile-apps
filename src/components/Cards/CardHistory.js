import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {colors, fonts} from '../../helpers/constants';
import {currency} from '../../helpers/number';

const CardHistory = React.memo((props) => {
  const {style, onPress, src, income, amount, name, type, ...card} = props;
  return (
    <RectButton
      {...card}
      rippleColor={colors.rippleDark}
      onPress={onPress}
      style={[styles.historyCard, style]}>
      <View style={styles.historySideLeft}>
        <Image
          source={src ? src : require('../../assets/images/default.png')}
          style={styles.historyPhoto}
        />
        <View style={styles.historyProfile}>
          <Text style={styles.historyName}>{name}</Text>
          <Text style={styles.historyType}>{type}</Text>
        </View>
      </View>

      {income ? (
        <Text style={styles.historyAmountUp}>+Rp{currency(amount)}</Text>
      ) : (
        <Text style={styles.historyAmountDown}>-Rp{currency(amount)}</Text>
      )}
    </RectButton>
  );
});

export default CardHistory;

const styles = StyleSheet.create({
  historyCard: {
    borderRadius: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  historySideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyProfile: {
    marginLeft: 15,
  },
  historyName: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  historyType: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: 14,
  },
  historyAmountUp: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.success,
  },
  historyAmountDown: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.error,
  },
  historyPhoto: {
    height: 56,
    width: 56,
  },
});
