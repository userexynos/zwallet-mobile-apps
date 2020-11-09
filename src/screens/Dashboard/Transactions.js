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
import {useDispatch, useSelector} from 'react-redux';
import {colors, fonts} from '../../helpers/constants';
import CardHistory from '../../components/Cards/CardHistory';
import Toolbar from '../../components/Toolbars/Toolbar';
import Icons from 'react-native-vector-icons/Feather';
import {currency} from '../../helpers/number';
import {Histories} from '../../redux/actions/users';
import Loading from '../../components/Modals/Loading';

const Transactions = ({navigation}) => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.Auth);
  const {income, expense, histories} = useSelector((state) => state.Users);

  React.useEffect(() => {
    _loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _loadHistory = () => {
    setLoading(true);
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
    dispatch(Histories({token, offset: 1, reset: true}, _callbackHistory));
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
          {error}
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
          <ScrollView style={{height: '100%'}} stickyHeaderIndices={[0]}>
            <Toolbar navigation={navigation} title="Transaction" />
            <View style={styles.trafficContainer}>
              <View style={styles.trafficView}>
                <View style={styles.trafficIncome}>
                  <Icons name="arrow-down" size={28} color={colors.success} />
                  <Text style={styles.trafficType}>Income</Text>
                  <Text style={styles.trafficAmount}>Rp{currency(income)}</Text>
                </View>

                <View style={styles.trafficExpense}>
                  <Icons name="arrow-up" size={28} color={colors.error} />
                  <Text style={styles.trafficType}>Expense</Text>
                  <Text style={styles.trafficAmount}>
                    Rp{currency(expense)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{marginVertical: 20, marginHorizontal: 16}}>
              <Text style={{fontSize: 18, fontFamily: fonts.bold}}>
                In This Week
              </Text>

              <Text style={{marginVertical: 80, textAlign: 'center'}}>
                Chart View
              </Text>
            </View>

            <View style={styles.historyContainer}>
              <View style={styles.historyHeading}>
                <Text style={styles.historyTitle}>Transaction History</Text>
                <Text
                  style={styles.historyAll}
                  onPress={() => navigation.navigate('History')}>
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

export default Transactions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },

  // Balance View
  trafficContainer: {
    marginVertical: 6,
    width: '100%',
    paddingHorizontal: 16,
  },
  trafficView: {
    width: '100%',
    padding: 25,
    backgroundColor: colors.primary,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trafficIncome: {
    width: '47%',
  },
  trafficExpense: {
    width: '47%',
  },
  trafficType: {
    marginVertical: 8,
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: 14,
  },
  trafficAmount: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 18,
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
