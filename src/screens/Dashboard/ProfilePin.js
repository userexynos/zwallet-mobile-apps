/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Text,
  Animated,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';
import Toolbar from '../../components/Toolbars/Toolbar';
import Button from '../../components/Buttons/Button';
import InputPinBorder from '../../components/Inputs/InputPinBorder';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Modals/Loading';
import {AuthCreatePin} from '../../redux/actions/auth';

const {width} = Dimensions.get('screen');

const ProfilePin = ({navigation}) => {
  const [pin, setPin] = React.useState('');
  const [isKey, setKey] = React.useState(false);
  const AnimatedContent = React.useState(new Animated.Value(0))[0];
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState('');
  const {token} = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', () => {
      setError('');
      setKey(true);
    });
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

  const _handleChangePin = () => {
    if (!pin) {
      return setError('Pin cannot be null');
    }

    setLoading(true);
    setError('');
    const data = {pin, token};

    const _callbackPin = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return setError(res.data.message);
        }
        return setError('Connection Error');
      }

      ToastAndroid.show('Success change pin', ToastAndroid.SHORT);
      return navigation.pop();
    };

    dispatch(AuthCreatePin(data, _callbackPin));
  };

  return (
    <>
      <Loading show={loading} />
      <StatusBar
        translucent
        backgroundColor={colors.transparent}
        barStyle="dark-content"
      />
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: '100%'}}
            stickyHeaderIndices={[0]}>
            <Toolbar
              backgroundColor={colors.vanilla}
              navigation={navigation}
              title="Change PIN"
            />

            <View style={styles.inputContainer}>
              <Text style={{color: colors.grey, marginBottom: 28}}>
                Type your new 6 digits security PIN to use in Zwallet.
              </Text>

              <InputPinBorder
                length={6}
                onChangeText={(text) => setPin(text)}
              />

              {error ? (
                <Text
                  style={{
                    color: colors.error,
                    fontFamily: fonts.bold,
                    textAlign: 'center',
                    marginVertical: 20,
                  }}>
                  {error}
                </Text>
              ) : null}

              <Button
                style={{
                  marginTop: error ? width / 1.18 : isKey ? width / 3.7 : width,
                  marginBottom: 10,
                }}
                rippleColor={colors.dark}
                textColor={colors.white}
                backgroundColor={colors.primary}
                text="Continue"
                onPress={_handleChangePin}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfilePin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  inputContainer: {
    marginHorizontal: 16,
  },
});
