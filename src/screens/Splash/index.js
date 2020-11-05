/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';

const {width, height} = Dimensions.get('window');

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('Auth'), 1500);
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor={colors.transparent} />
      <SafeAreaView>
        <View style={styles.splash}>
          <Text style={styles.splashText}> ZWallet </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  splash: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    height,
  },
  splashText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: width / 15,
    fontWeight: '600',
  },
});

export default Splash;
