/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {colors, fonts} from '../../helpers/constants';
import Icons from 'react-native-vector-icons/Feather';
import CardCustom from '../../components/Cards/CardCustom';
import CardReceiver from '../../components/Cards/CardReceiver';
import Button from '../../components/Buttons/Button';
import {HistoryByID} from '../../redux/actions/users';
import {useDispatch, useSelector} from 'react-redux';
import {currency} from '../../helpers/number';
import Loading from '../../components/Modals/Loading';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const TransferStatus = ({navigation, route}) => {
  useFocusEffect(
    React.useCallback(() => {
      const nav = navigation;
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          nav.navigate('Main');
          return true;
        },
      );

      return () => backHandler.remove();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.Auth);
  const {history} = useSelector((state) => state.Users);

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
          navigation.replace('Main');
          return ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }
        return ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
      }
    };
    dispatch(HistoryByID({id: route.params.id, token}, _callbackHistory));
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
            style={{height: '100%'}}>
            <View style={{paddingHorizontal: 16, paddingVertical: 20}}>
              <View style={styles.iconContainer}>
                <Icons name="check" size={30} color={colors.white} />
              </View>

              <Text style={styles.title}>Transfer Success</Text>

              <Text style={styles.transferTitle}>Details</Text>

              <CardCustom
                style={{borderRadius: 10, marginVertical: 6}}
                title="Amount"
                subtitle={`Rp${currency(history.amount)}`}
              />

              <CardCustom
                style={{borderRadius: 10, marginVertical: 6}}
                title="Balance Left"
                subtitle={`Rp${currency(history.balance)}`}
              />

              <CardCustom
                style={{borderRadius: 10, marginVertical: 6}}
                title="Date & Time"
                subtitle={`${moment(history.created_at).format('LL')}`}
              />

              <CardCustom
                style={{borderRadius: 10, marginVertical: 6}}
                title="Notes"
                subtitle={history.note}
              />

              <Text style={styles.transferTitle}>Transfer to</Text>
              <CardReceiver
                style={{borderRadius: 10, marginVertical: 6}}
                rippleColor={colors.transparent}
                name={history.name_receiver}
                phone={
                  history.phone_receiver
                    ? `+62 ${history.phone_receiver}`
                    : "The phone isn't set"
                }
              />

              <Button
                style={{marginTop: 20}}
                rippleColor={colors.dark}
                textColor={colors.white}
                backgroundColor={colors.primary}
                text="Back to Home"
                onPress={() => navigation.navigate('Main')}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TransferStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  iconContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    borderRadius: 100,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  transferTitle: {
    marginTop: 10,
    marginBottom: 6,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
});
