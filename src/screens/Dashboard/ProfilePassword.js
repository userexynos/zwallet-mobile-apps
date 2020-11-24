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
import InputBorderedBottom from '../../components/Inputs/InputBorderedBottom';
import {useDispatch, useSelector} from 'react-redux';
import {ChangePassword} from '../../redux/actions/users';
import Loading from '../../components/Modals/Loading';

const {width} = Dimensions.get('screen');

const ProfilePassword = ({navigation}) => {
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [verify, setVerify] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState('');
  const newPasswordRef = React.useRef();
  const verifyRef = React.useRef();
  const [isKey, setKey] = React.useState(false);
  const AnimatedContent = React.useState(new Animated.Value(0))[0];

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

  const _changePassword = () => {
    if (!password) {
      return setError('Password cannot be null');
    } else if (!newPassword) {
      return setError('New password cannot be null');
    } else if (newPassword !== verify) {
      return setError("Verify Password isn't match");
    }

    setLoading(true);
    const _callbackChangePass = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return setError(res.data.message);
        }

        ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
        return setError('Connection Refused');
      }

      ToastAndroid.show('Success change password', ToastAndroid.SHORT);
      return navigation.pop();
    };

    const data = {password, passwordNew: newPassword, token};
    dispatch(ChangePassword(data, _callbackChangePass));
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
              title="Change Password"
            />

            <View style={styles.inputContainer}>
              <Text style={{color: colors.grey, marginBottom: 28}}>
                You must enter your current password and then type your new
                password twice.
              </Text>

              <InputBorderedBottom
                returnKeyType="next"
                onChangeText={(text) => setPassword(text)}
                style={{marginTop: 20}}
                placeholder="Enter Current Password"
                icon="lock"
                secureTextEntry
                onSubmitEditing={() => newPasswordRef.current.focus()}
                value={password}
                error={error}
              />

              <InputBorderedBottom
                reff={newPasswordRef}
                returnKeyType="next"
                onChangeText={(text) => setNewPassword(text)}
                style={{marginTop: 20}}
                placeholder="Enter New Password"
                icon="lock"
                secureTextEntry
                value={newPassword}
                onSubmitEditing={() => verifyRef.current.focus()}
                error={error}
              />

              <InputBorderedBottom
                reff={verifyRef}
                returnKeyType="done"
                onChangeText={(text) => setVerify(text)}
                style={{marginTop: 20}}
                placeholder="Enter Password Confirmation"
                icon="lock"
                secureTextEntry
                value={verify}
                error={error}
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
                  marginTop: error
                    ? width / 2.5
                    : isKey
                    ? width / 6
                    : width / 1.8,
                  marginBottom: 10,
                }}
                rippleColor={colors.dark}
                textColor={colors.white}
                backgroundColor={colors.primary}
                text="Continue"
                onPress={_changePassword}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfilePassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  inputContainer: {
    marginHorizontal: 16,
  },
});
