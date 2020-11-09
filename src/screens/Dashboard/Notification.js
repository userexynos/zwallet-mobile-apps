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
  ToastAndroid,
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';
import CardHistory from '../../components/Cards/CardHistory';
import Toolbar from '../../components/Toolbars/Toolbar';
import {useDispatch, useSelector} from 'react-redux';
import {Histories} from '../../redux/actions/users';
import Loading from '../../components/Modals/Loading';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');

const History = ({navigation}) => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [more, setMore] = React.useState(true);
  const [offset, setOffset] = React.useState(2);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.Auth);
  const {histories} = useSelector((state) => state.Users);

  React.useEffect(() => {
    setLoading(true);
    dispatch(Histories({token, offset: 1, reset: true}, _callbackHistory));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _callbackHistory = (res, err) => {
    setLoading(false);
    if (err) {
      if (res) {
        return setError(res.data.message);
      }
      ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
      return setError('Connection Refused');
    }
    if (res.data.data.history.length < 5) {
      setMore(false);
    }
  };
  const _loadHistory = () => {
    setLoading(true);
    setOffset(offset + 1);
    dispatch(Histories({token, offset, reset: false}, _callbackHistory));
  };

  const RenderHistory = () => (
    <>
      <Loading show={loading} />
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
        histories.map((item, index) => (
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
      <StatusBar
        translucent
        backgroundColor={colors.transparent}
        barStyle="dark-content"
      />
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{height: height}}
            stickyHeaderIndices={[0]}>
            <Toolbar
              backgroundColor={colors.vanilla}
              navigation={navigation}
              title="Notification"
            />

            <View style={[styles.historyContainer, {marginBottom: width / 9}]}>
              <RenderHistory />

              {more ? (
                <TouchableWithoutFeedback
                  onPress={() => _loadHistory()}
                  style={{marginVertical: 10, alignItems: 'center'}}>
                  <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                    Load More
                  </Text>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'space-between',
  },

  // TransactionHistory
  historyContainer: {
    zIndex: 0,
  },
});
