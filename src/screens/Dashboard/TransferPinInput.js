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
  Keyboard,
  Animated,
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';
import Toolbar from '../../components/Toolbars/Toolbar';
import Button from '../../components/Buttons/Button';
import InputPinBorder from '../../components/Inputs/InputPinBorder';
import {useDispatch, useSelector} from 'react-redux';
import {BalanceTransfer} from '../../redux/actions/users';
import Loading from '../../components/Modals/Loading';
import {patcher, SETUSERDATA} from '../../redux/constants';

const {width} = Dimensions.get('screen');

const TransferPinInput = ({navigation, route}) => {
  const [pin, setPin] = React.useState('');
  const [isKey, setKey] = React.useState(false);
  const AnimatedContent = React.useState(new Animated.Value(0))[0];
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState('');
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

  const _handleSubmit = () => {
    setLoading(true);
    setError('');
    const data = {
      pin,
      total: route.params.detail.amount,
      note: route.params.detail.note,
      id: route.params.user.id,
      token,
    };

    const _callbackTransfer = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return setError(res.data.message);
        }
        return setError('Connection Error');
      }

      dispatch(
        patcher(SETUSERDATA, {
          ...userdata,
          // eslint-disable-next-line radix
          balance: userdata.balance - parseInt(route.params.detail.amount),
        }),
      );
      navigation.replace('TransferStatus', {id: res.data.data.id});
    };

    dispatch(BalanceTransfer(data, _callbackTransfer));
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
              title="Enter Your Pin"
            />

            <View style={styles.inputContainer}>
              <Text style={{color: colors.grey, marginBottom: 28}}>
                Enter your 6 digits PIN for confirmation to continue
                transferring money.
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
                  marginTop: error ? width / 1.18 : isKey ? width / 3 : width,
                  marginBottom: 10,
                }}
                rippleColor={colors.dark}
                textColor={colors.white}
                backgroundColor={colors.primary}
                text="Continue"
                onPress={_handleSubmit}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TransferPinInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  inputContainer: {
    marginHorizontal: 16,
  },
});
