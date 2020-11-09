/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import {colors, fonts} from '../../helpers/constants';

const {width} = Dimensions.get('window');

const Input = memo((props) => {
  const {
    icon,
    reff,
    password,
    onBlur,
    styleInput,
    style,
    iconColor,
    onFocus,
    ...input
  } = props;
  const [focus, setFocus] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const active = focus || input.value ? colors.primary : iconColor;
  const showActive = show ? colors.primary : colors.grey;
  const _handleBlur = () => {
    setFocus(!focus);
    onBlur ? onBlur() : null;
  };

  const _handleFocus = () => {
    setFocus(!focus);
    onFocus ? onFocus() : null;
  };

  return (
    <View
      style={{
        ...styles.inputContainer,
        ...style,
        borderBottomColor: active,
      }}>
      {icon ? <Icons name={icon} color={active} size={width / 14} /> : null}

      <TextInput
        {...input}
        ref={reff}
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        secureTextEntry={show ? false : input.secureTextEntry}
        style={{
          ...styles.textInput,
          width: input.secureTextEntry ? '75%' : '88%',
          ...styleInput,
        }}
      />

      {input.secureTextEntry ? (
        <Icons
          name="eye"
          color={showActive}
          size={width / 14}
          onPress={() => setShow(!show)}
        />
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: fonts.regular,
  },
  textInput: {
    fontFamily: fonts.regular,
    fontSize: 16,
    marginHorizontal: width / 40,
  },
});

export default Input;
