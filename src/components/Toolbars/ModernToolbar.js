/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import {colors, fonts} from '../../helpers/constants';

const ModernToolbar = React.memo(({name, src, navigation}) => {
  return (
    <View style={styles.toolbar}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Profile')}
        style={styles.barLeft}>
        <Image
          source={src ? {uri: src} : require('../../assets/images/default.png')}
          style={styles.photo}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>

      <ButtonIcon
        rippleColor={colors.rippleDark}
        style={{backgroundColor: colors.vanilla}}
        icon="bell"
        onPress={() => navigation.navigate('Notification')}
        iconSize={28}
        iconColor={colors.dark}
      />
    </View>
  );
});

export default ModernToolbar;

const styles = StyleSheet.create({
  // Toobar
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  barLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    height: 52,
    width: 52,
    borderRadius: 10,
  },
  greeting: {
    fontFamily: fonts.light,
    fontSize: 16,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
});
