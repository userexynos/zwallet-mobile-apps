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
  Keyboard,
  Animated,
} from 'react-native';
import Button from '../../components/Buttons/Button';
import InputBorderedBottom from '../../components/Inputs/InputBorderedBottom';
import {colors, fonts} from '../../helpers/constants';

const {width} = Dimensions.get('window');

const Register = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isKey, setKey] = React.useState(false);
  const AnimatedContent = React.useState(new Animated.Value(0))[0];
  const AnimatedContentRef = React.useRef(AnimatedContent);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  React.useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', () =>
      setKey(true),
    );
    const keyboardDismiss = Keyboard.addListener('keyboardDidHide', () =>
      setKey(false),
    );
    return () => {
      keyboardShow.remove();
      keyboardDismiss.remove();
    };
  }, []);

  React.useEffect(() => {
    Animated.timing(AnimatedContent, {
      toValue: isKey ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [AnimatedContent, isKey]);

  const translateY = AnimatedContentRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width / 4.5],
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={colors.transparent}
        barStyle="dark-content"
      />
      <SafeAreaView style={{marginBottom: isKey ? -width / 5 : 0}}>
        <View style={styles.container}>
          <ScrollView style={{height: '100%'}}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>ZWallet</Text>
            </View>

            <Animated.View style={[styles.content, {translateY}]}>
              <Text style={styles.contentHeadingText}>Sign Up</Text>

              <Text style={styles.contentSubtitleText}>
                Create your account to access Zwallet.
              </Text>

              <View style={styles.formContainer}>
                <InputBorderedBottom
                  returnKeyType="next"
                  onChangeText={(text) => setName(text)}
                  onSubmitEditing={() => emailRef.current.focus()}
                  style={{marginTop: 20}}
                  placeholder="Enter your name"
                  icon="user"
                  value={name}
                />

                <InputBorderedBottom
                  reff={emailRef}
                  returnKeyType="next"
                  keyboardType="email-address"
                  onChangeText={(text) => setEmail(text)}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  style={{marginTop: 20}}
                  placeholder="Enter your e-mail"
                  icon="mail"
                  value={email}
                />

                <InputBorderedBottom
                  reff={passwordRef}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                  style={{marginTop: 20}}
                  returnKeyType="done"
                  placeholder="********"
                  icon="lock"
                  value={password}
                />

                <Button
                  style={{marginTop: isKey ? width / 20 : width / 6}}
                  rippleColor={colors.dark}
                  textColor={colors.white}
                  backgroundColor={colors.primary}
                  onPress={() => navigation.navigate('RegisterPin')}
                  text="Sign Up"
                />

                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 5,
                    color: colors.grey,
                    fontFamily: fonts.regular,
                  }}>
                  Already have an account? Let’s{' '}
                  <Text
                    style={{color: colors.primary, fontFamily: fonts.bold}}
                    onPress={() => navigation.pop()}>
                    Login
                  </Text>
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
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
    height: width / 3,
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
  formContainer: {
    marginVertical: width / 40,
    width: '100%',
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});

export default Register;
