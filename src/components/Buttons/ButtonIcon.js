import React from 'react';
import {StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Feather';

const ButtonIcon = React.memo((props) => {
  const {
    onPress,
    style,
    icon,
    iconSize,
    iconColor,
    buttonRadius,
    ...button
  } = props;
  return (
    <RectButton
      style={[
        styles.btnCircleIcon,
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {borderRadius: buttonRadius ? buttonRadius : 100},
      ]}
      onPress={onPress}
      {...button}>
      <Icons name={icon} size={iconSize} color={iconColor} />
    </RectButton>
  );
});

export default ButtonIcon;

const styles = StyleSheet.create({
  // Button
  btnCircleIcon: {
    padding: 8,
  },
});
