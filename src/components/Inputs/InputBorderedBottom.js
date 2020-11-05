/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import {colors, fonts} from '../../helpers/constants';

const {width} = Dimensions.get('window');

const InputBorderedBottom = (props) => {
  const {icon, reff, password, style, ...input} = props;
  const [focus, setFocus] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const active = focus || input.value ? colors.primary : colors.grey;
  const showActive = show ? colors.primary : colors.grey;

  return (
    <View
      style={{
        ...styles.inputContainer,
        ...style,
        borderBottomColor: active,
      }}>
      <Icons name={icon} color={active} size={width / 14} />

      <TextInput
        {...input}
        ref={reff}
        onFocus={() => setFocus(!focus)}
        onBlur={() => setFocus(!focus)}
        secureTextEntry={show ? false : input.secureTextEntry}
        style={{
          ...styles.textInput,
          width: input.secureTextEntry ? '75%' : '88%',
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
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    overflow: 'hidden',
    fontFamily: fonts.regular,
  },
  textInput: {
    fontFamily: fonts.regular,
    fontSize: 16,
    marginHorizontal: width / 40,
  },
});

export default InputBorderedBottom;
