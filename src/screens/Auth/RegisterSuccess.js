/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import Button from '../../components/Buttons/Button';
import {colors, fonts} from '../../helpers/constants';

const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={colors.transparent}
        barStyle="dark-content"
      />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>ZWallet</Text>
          </View>
          <View style={styles.content}>
            <View
              style={{
                backgroundColor: colors.success,
                padding: 10,
                borderRadius: 50,
                marginBottom: 10,
              }}>
              <Icons name="check" color={colors.white} size={30} />
            </View>

            <Text style={styles.contentHeadingText}>
              PIN Successfully Created
            </Text>
            <Text style={styles.contentSubtitleText}>
              Your PIN was successfully created and you can now access all the
              features in Zwallet. Login to your new account and start
              exploring!
            </Text>

            <Button
              style={{marginTop: width / 20, width: '100%'}}
              rippleColor={colors.dark}
              textColor={colors.white}
              backgroundColor={colors.primary}
              text="Confirm"
              onPress={() => navigation.pop(3)}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width / 1.4,
  },
  headingText: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  content: {
    backgroundColor: colors.white,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    elevation: 10,
    paddingHorizontal: width / 14,
    paddingTop: width / 12,
    alignItems: 'center',
    width,
    height: '100%',
  },
  contentHeadingText: {
    color: colors.dark,
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  contentSubtitleText: {
    color: colors.dark,
    textAlign: 'center',
    marginVertical: 14,
    fontFamily: fonts.regular,
    fontSize: 18,
    opacity: 0.4,
  },
});

export default Login;
