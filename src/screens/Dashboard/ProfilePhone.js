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
import {AddPhone} from '../../redux/actions/users';
import {patcher, SETUSERDATA} from '../../redux/constants';
import Loading from '../../components/Modals/Loading';

const {width} = Dimensions.get('screen');

const ProfilePhone = ({navigation}) => {
  const [phone, setPhone] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isKey, setKey] = React.useState(false);
  const AnimatedContent = React.useState(new Animated.Value(0))[0];
  const {token} = useSelector((state) => state.Auth);
  const {userdata} = useSelector((state) => state.Users);
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

  const _submitPhone = () => {
    setLoading(true);
    const _callbackAddPhone = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          console.log(res);
          return setError(res.data.message);
        }

        ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
        return setError('Connection Refused');
      }
      const data = {...userdata, phone};
      dispatch(patcher(SETUSERDATA, data));

      return navigation.pop();
    };
    dispatch(AddPhone({token, phone}, _callbackAddPhone));
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
              title="Add Phone"
            />

            <View style={styles.inputContainer}>
              <Text style={{color: colors.grey, marginBottom: 28}}>
                Add at least one phone number for the transfer ID so you can
                start transfering your money to another user.
              </Text>

              <InputBorderedBottom
                onChangeText={(text) => setPhone(text)}
                style={{marginTop: 30}}
                placeholder="Enter your phone number"
                icon="phone"
                value={phone}
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
                disable
                style={{
                  marginTop: error
                    ? width / 1.35
                    : isKey
                    ? width / 5
                    : width / 1.1,
                  marginBottom: 10,
                }}
                rippleColor={colors.dark}
                textColor={colors.white}
                backgroundColor={colors.primary}
                text="Continue"
                onPress={_submitPhone}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfilePhone;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  inputContainer: {
    marginHorizontal: 16,
  },
});
