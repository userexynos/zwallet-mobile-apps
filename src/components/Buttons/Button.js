import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {fonts} from '../../helpers/constants';

const Button = (props) => {
  const {textColor, style, text, backgroundColor, fontSize, ...button} = props;

  return (
    <RectButton {...button} style={[styles.button, style, {backgroundColor}]}>
      <Text style={[styles.buttonText, {color: textColor, fontSize: fontSize}]}>
        {text}
      </Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.bold,
  },
});

export default Button;
