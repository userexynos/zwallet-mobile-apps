/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';
import ButtonTextIcon from '../../components/Buttons/ButtonTextIcon';
import CardHistory from '../../components/Cards/CardHistory';
import ModernToolbar from '../../components/Toolbars/ModernToolbar';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Modals/Loading';
import {Histories, UserLoad} from '../../redux/actions/users';
import {currency} from '../../helpers/number';
import {AuthLogout} from '../../redux/actions/auth';

const Main = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.Auth);
  const {userdata, histories} = useSelector((state) => state.Users);

  React.useEffect(() => {
    setLoading(true);
    _loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _loadUser = () => {
    const _callbackHandler = (res, err) => {
      if (!err) {
        if (!res.data.data.pin) {
          setLoading(false);
          return navigation.replace('Auth', {
            screen: 'RegisterPin',
            params: {token, navigate: 'Dashboard'},
          });
        }
        return _loadHistory();
      }
      setLoading(false);
      if (res) {
        dispatch(AuthLogout());
        return navigation.replace('Auth');
      }
      return ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
    };
    dispatch(UserLoad(token, _callbackHandler));
  };

  const _loadHistory = () => {
    const _callbackHistory = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return setError(res.data.message);
        }

        ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
        return setError('Connection Refused');
      }
    };
    return dispatch(
      Histories({token, offset: 1, reset: true}, _callbackHistory),
    );
  };

  const RenderHistory = () => (
    <>
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
      ) : !histories.length ? (
        <Text
          style={{
            color: colors.grey,
            fontFamily: fonts.bold,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          You not have any transaction
        </Text>
      ) : (
        histories
          .slice(0, 5)
          .map((item, index) => (
            <CardHistory
              key={index}
              name={item.name}
              type={item.type}
              amount={item.type === 'topup' ? item.amount_topup : item.amount}
              style={{marginVertical: 5}}
              income={item.is_income}
            />
          ))
      )}
    </>
  );

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
          <ScrollView style={{heiht: '100%'}}>
            <ModernToolbar
              navigation={navigation}
              name={userdata.name}
              src={userdata?.photo ? userdata?.photo : ''}
            />
            <View style={styles.balanceContainer}>
              <View style={styles.balanceView}>
                <Text style={styles.balanceTitle}>Balance</Text>
                <Text style={styles.balanceAmount}>
                  Rp{currency(userdata?.balance)}
                </Text>
                <Text style={styles.balancePhone}>
                  {userdata?.phone
                    ? `+62 ${userdata?.phone}`
                    : "The phone isn't set"}
                </Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <ButtonTextIcon
                icon="arrow-up"
                iconSize={28}
                iconColor={colors.primary}
                textColor={colors.dark}
                style={styles.actionButton}
                fontSize={18}
                rippleColor={colors.rippleDark}
                backgroundColor={colors.grey2}
                text="Transfer"
                onPress={() => navigation.navigate('SearchReceiver')}
              />

              <ButtonTextIcon
                icon="arrow-up"
                iconSize={28}
                iconColor={colors.primary}
                rippleColor={colors.rippleDark}
                fontSize={18}
                textColor={colors.dark}
                style={styles.actionButton}
                backgroundColor={colors.grey2}
                text="Top Up"
                onPress={() => navigation.navigate('Topup')}
              />
            </View>

            <View style={styles.historyContainer}>
              <View style={styles.historyHeading}>
                <Text style={styles.historyTitle}>Transaction History</Text>
                <Text
                  onPress={() => navigation.navigate('Transactions')}
                  style={styles.historyAll}>
                  See All
                </Text>
              </View>
              <RenderHistory />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
    height: '100%',
  },

  // Balance View
  balanceContainer: {
    marginVertical: 6,
    width: '100%',
    paddingHorizontal: 16,
  },
  balanceView: {
    width: '100%',
    padding: 25,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  balanceTitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.white,
  },
  balanceAmount: {
    fontFamily: fonts.bold,
    marginVertical: 10,
    fontSize: 28,
    color: colors.white,
  },
  balancePhone: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.white,
  },

  // actionContainer
  actionContainer: {
    marginVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
  },

  // TransactionHistory
  historyContainer: {
    marginBottom: 14,
  },
  historyHeading: {
    marginHorizontal: 16,
    marginVertical: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  historyAll: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
});
