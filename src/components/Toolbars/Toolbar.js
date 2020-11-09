/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import {colors, fonts} from '../../helpers/constants';

const Toolbar = React.memo(
  ({title, backgroundColor, toolbarColor, navigation}) => {
    return (
      <View
        style={[
          styles.toolbar,
          {backgroundColor: toolbarColor ? toolbarColor : colors.vanilla},
        ]}>
        <ButtonIcon
          style={{
            backgroundColor: backgroundColor ? backgroundColor : colors.vanilla,
          }}
          rippleColor={colors.rippleDark}
          icon="arrow-left"
          onPress={() => navigation.pop()}
          iconSize={28}
          iconColor={colors.dark}
        />

        <Text style={styles.title}>{title}</Text>
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
