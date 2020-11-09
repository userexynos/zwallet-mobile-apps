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
import {useDispatch} from 'react-redux';
import Button from '../../components/Buttons/Button';
import InputPinBorder from '../../components/Inputs/InputPinBorder';
import Loading from '../../components/Modals/Loading';
import {colors, fonts} from '../../helpers/constants';
import {AuthCreatePin} from '../../redux/actions/auth';

const {width} = Dimensions.get('window');

const Login = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [pin, setPin] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isKey, setKey] = React.useState(false);
  const AnimatedContent = React.useState(new Animated.Value(0))[0];
  const AnimatedContentRef = React.useRef(AnimatedContent);

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

  const _handleCreatePin = () => {
    setLoading(true);
    setError('');
    const data = {pin, token: route.params.token};

    const _handleResponse = (res, err) => {
      setLoading(false);
      if (!err) {
        return navigation.navigate('RegisterSuccess', {
          navigate: route.params?.navigate,
        });
      }
      if (res) {
        return setError(res.data.message);
      }
      return setError('Connection Error');
    };

    dispatch(AuthCreatePin(data, _handleResponse));
  };

  return (
    <>
      <Loading show={loading} />
      <StatusBar
        translucent
        backgroundColor={colors.transparent}
        barStyle="dark-content"
      />
      <SafeAreaView style={{marginBottom: isKey ? -width / 1.8 : 0}}>
        <View style={styles.container}>
          <ScrollView style={{height: '100%'}}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>ZWallet</Text>
            </View>
            <Animated.View style={[styles.content, {translateY}]}>
              <Text style={styles.contentHeadingText}>Create Security PIN</Text>
              <Text style={styles.contentSubtitleText}>
                Create a PIN that’s contain 6 digits number for security purpose
                in Zwallet.
              </Text>

              <View style={styles.formContainer}>
                <InputPinBorder
                  length={6}
                  onChangeText={(text) => setPin(text)}
                />

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
                  disabled={!pin}
                  style={{marginTop: isKey ? width / 4 : width / 1.8}}
                  rippleColor={colors.dark}
                  textColor={colors.white}
                  backgroundColor={colors.primary}
                  text="Confirm"
                  onPress={_handleCreatePin}
                />
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
