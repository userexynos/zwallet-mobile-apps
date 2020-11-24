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
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {colors, fonts} from '../../helpers/constants';
import Button from '../../components/Buttons/Button';
import InputBorderedBottom from '../../components/Inputs/InputBorderedBottom';
import Loading from '../../components/Modals/Loading';
import {AuthLogin} from '../../redux/actions/auth';
import messaging from '@react-native-firebase/messaging';

const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const passwordRef = React.useRef();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isKey, setKey] = React.useState(false);
  const AnimatedContent = React.useState(new Animated.Value(0))[0];
  const AnimatedContentRef = React.useRef(AnimatedContent);
  const {token} = useSelector((state) => state.Auth);

  React.useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', () =>
      setKey(true),
    );
    const keyboardDismiss = Keyboard.addListener('keyboardDidHide', () => {
      setKey(false);
    });

    if (token) {
      navigation.replace('Dashboard');
    }
    return () => {
      keyboardShow.remove();
      keyboardDismiss.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const _handleEmail = (text) => {
    if (error) {
      setError('');
    }

    setEmail(text);
  };

  const _handlePassword = (text) => {
    if (error) {
      setError('');
    }

    setPassword(text);
  };

  const _handleLogin = () => {
    if (!email) {
      return setError('Email cannot be null');
    } else if (!password) {
      return setError('Password cannot be null');
    }

    setLoading(true);
    setError('');
    messaging()
      .getToken()
      .then((device) => {
        const data = {email, password, device};

        const _handleResponse = (res, err) => {
          setLoading(false);
          if (!err) {
            return navigation.replace('Dashboard');
          }

          if (res) {
            return setError(res.data.message);
          }
          return setError('Connection Error');
        };

        dispatch(AuthLogin(data, _handleResponse));
      });
  };

  return (
    <>
      <Loading show={loading} />
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
              <Text style={styles.contentHeadingText}>Login</Text>
              <Text style={styles.contentSubtitleText}>
                Login to your existing account to access all the features in
                Zwallet.
              </Text>

              <View style={styles.formContainer}>
                <InputBorderedBottom
                  returnKeyType="next"
                  onChangeText={_handleEmail}
                  onSubmitEditing={() => passwordRef.current.focus()}
                  style={{marginTop: 20}}
                  keyboardType="email-address"
                  placeholder="Enter your e-mail"
                  icon="mail"
                  value={email}
                  error={error}
                />
                <InputBorderedBottom
                  reff={passwordRef}
                  onChangeText={_handlePassword}
                  secureTextEntry
                  style={{marginTop: 20}}
                  returnKeyType="done"
                  placeholder="********"
                  icon="lock"
                  value={password}
                  error={error}
                />
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('ResetPassword')}
                  style={styles.forgotPass}>
                  <Text style={{color: colors.grey}}>Forgot Password?</Text>
                </TouchableWithoutFeedback>

                <Text
                  style={{
                    color: colors.error,
                    textAlign: 'center',
                    fontSize: 12,
                    marginTop: 10,
                  }}>
                  {error ? error : ''}
                </Text>

                <Button
                  style={{marginTop: isKey ? width / 30 : width / 7}}
                  rippleColor={colors.dark}
                  textColor={colors.white}
                  backgroundColor={colors.primary}
                  text="Login"
                  onPress={_handleLogin}
                />

                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    marginTop: 5,
                    fontFamily: fonts.regular,
                    color: colors.grey,
                  }}>
                  Don’t have an account? Let’s{' '}
                  <Text
                    style={{color: colors.primary, fontFamily: fonts.bold}}
                    onPress={() => navigation.navigate('Register')}>
                    Sign Up
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

export default Login;
