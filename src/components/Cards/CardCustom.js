import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {colors, fonts} from '../../helpers/constants';

const CardCustom = React.memo((props) => {
  const {style, children, title, subtitle, ...card} = props;
  return (
    <RectButton {...card} style={[styles.customCard, style]}>
      <View>
        <Text style={styles.customTitle}>{title}</Text>
        <Text style={styles.customSubtitle}>{subtitle}</Text>
      </View>
      {children}
    </RectButton>
  );
});

export default CardCustom;

const styles = StyleSheet.create({
  customCard: {
    borderRadius: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    elevation: 2,
  },
  customSideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customTitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grey,
  },
  customSubtitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    marginTop: 6,
  },
});
