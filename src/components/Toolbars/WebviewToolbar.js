/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import {colors, fonts} from '../../helpers/constants';
import Icons from 'react-native-vector-icons/Feather';

const Toolbar = React.memo(
  ({title, backgroundColor, onPress, toolbarColor, navigation, children}) => {
    return (
      <View
        style={[
          styles.toolbar,
          {backgroundColor: toolbarColor ? toolbarColor : colors.vanilla},
        ]}>
        {/* <ButtonIcon
          style={{
            backgroundColor: backgroundColor ? backgroundColor : colors.vanilla,
          }}
          rippleColor={colors.rippleDark}
          icon="x"
          onPress={onPress}
          iconSize={28}
          iconColor={colors.dark}
        /> */}
        <TouchableOpacity onPress={() => console.log(1)}>
          <Icons name="x" />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        {children}
      </View>
    );
  },
);

export default Toolbar;

const styles = StyleSheet.create({
  // Toobar
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginLeft: 12,
  },
});
