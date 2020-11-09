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
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import Button from '../../components/Buttons/Button';
import {useDispatch, useSelector} from 'react-redux';
import {FilterHistory, Histories} from '../../redux/actions/users';
import Loading from '../../components/Modals/Loading';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

const History = ({navigation}) => {
  const [error, setError] = React.useState('');
  const [filter, setFilter] = React.useState('');
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

  React.useEffect(() => {
    setOffset(2);
    setMore(true);
    setLoading(true);

    if (!filter) {
      return dispatch(
        Histories({token, offset: 1, reset: true}, _callbackHistory),
      );
    }

    return dispatch(
      FilterHistory({token, filter, offset: 1, reset: true}, _callbackHistory),
    );
  }, [filter, dispatch, token]);

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

  const _loadHistoryFilter = () => {
    setLoading(true);
    setOffset(offset + 1);
    dispatch(
      FilterHistory({token, filter, offset, reset: false}, _callbackHistory),
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
            stickyHeaderIndices={[0, 2]}>
            <Toolbar
              backgroundColor={colors.vanilla}
              navigation={navigation}
              title="History"
            />

            <View
              style={[styles.historyContainer, {marginBottom: width / 3.2}]}>
              <RenderHistory />

              {more ? (
                <TouchableWithoutFeedback
                  onPress={() =>
                    filter ? _loadHistoryFilter() : _loadHistory()
                  }
                  style={{marginVertical: 10, alignItems: 'center'}}>
                  <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                    Load More
                  </Text>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <View style={styles.bottomAction}>
              <ButtonIcon
                icon="arrow-up"
                buttonRadius={12}
                rippleColor={colors.rippleDark}
                iconSize={28}
                iconColor={colors.success}
                style={[
                  styles.buttonAction,
                  {
                    backgroundColor:
                      filter === 'income' ? colors.primary : colors.white,
                  },
                ]}
                onPress={() => setFilter(filter === 'income' ? '' : 'income')}
              />

              <ButtonIcon
                icon="arrow-down"
                buttonRadius={12}
                rippleColor={colors.rippleDark}
                iconSize={28}
                iconColor={colors.error}
                style={[
                  styles.buttonAction,
                  {
                    backgroundColor:
                      filter === 'expense' ? colors.primary : colors.white,
                  },
                ]}
                onPress={() => setFilter(filter === 'expense' ? '' : 'expense')}
              />

              <Button
                style={styles.buttonDate}
                backgroundColor={colors.white}
                text="Filter by Date"
                textColor={colors.primary}
                fontSize={18}
              />
            </View>
          </View>
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

  // BottomContainer
  bottomContainer: {
    width,
    height: height - StatusBar.currentHeight,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  bottomAction: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAction: {
    backgroundColor: colors.white,
    elevation: 4,
    height: 57,
    width: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDate: {
    elevation: 4,
    height: 57,
    width: width / 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
