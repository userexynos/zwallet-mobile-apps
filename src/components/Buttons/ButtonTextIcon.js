import React, {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {fonts} from '../../helpers/constants';
import Icons from 'react-native-vector-icons/Feather';

const ButtonTextIcon = memo((props) => {
  const {
    icon,
    iconColor,
    iconSize,
    textColor,
    style,
    text,
    backgroundColor,
    fontSize,
    ...button
  } = props;

  return (
    <RectButton {...button} style={[styles.button, style, {backgroundColor}]}>
      <Icons name={icon} color={iconColor} size={iconSize} />
      <Text style={[styles.buttonText, {color: textColor, fontSize: fontSize}]}>
        {text}
      </Text>
    </RectButton>
  );
});

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: fonts.bold,
    marginLeft: 8,
  },
});

export default ButtonTextIcon;
