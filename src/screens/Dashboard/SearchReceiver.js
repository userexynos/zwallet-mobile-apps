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
import Toolbar from '../../components/Toolbars/Toolbar';
import Input from '../../components/Inputs/Input';
import CardReceiver from '../../components/Cards/CardReceiver';
import {FindUser} from '../../redux/actions/users';
import Loading from '../../components/Modals/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {height} = Dimensions.get('screen');

const SearchReceiver = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [more, setMore] = React.useState(true);
  const [offset, setOffset] = React.useState(2);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.Auth);
  const {findUser} = useSelector((state) => state.Users);

  React.useEffect(() => {
    _findUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _callbackFindUser = (res, err) => {
    setLoading(false);
    if (err) {
      if (res) {
        return setError(res.data.message);
      }
      ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
      return setError('Connection Refused');
    }
    if (res.data.data.length < 5) {
      setMore(false);
    }
  };

  const _loadFindUser = () => {
    setLoading(true);
    setOffset(offset + 1);
    dispatch(FindUser({token, name, offset, reset: false}, _callbackFindUser));
  };

  const _findUser = () => {
    setLoading(true);
    setOffset(2);
    dispatch(
      FindUser({token, name, offset: 1, reset: true}, _callbackFindUser),
    );
  };

  const RenderFindUser = () => (
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
      ) : !findUser.length ? (
        <Text
          style={{
            color: colors.grey,
            fontFamily: fonts.bold,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          User data isn't available
        </Text>
      ) : (
        findUser.map((item, index) => (
          <CardReceiver
            key={index}
            style={{marginVertical: 5}}
            src={item.photo}
            name={item.name}
            phone={item?.phone ? `+62 ${item?.phone}` : "The phone isn't set"}
            onPress={() => navigation.navigate('TransferAmount', item)}
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
            style={{height: height}}
            stickyHeaderIndices={[0]}>
            <Toolbar
              backgroundColor={colors.vanilla}
              navigation={navigation}
              title="Find Receiver"
            />

            <View style={styles.contactContainer}>
              <View style={{marginHorizontal: 16, marginBottom: 24}}>
                <Input
                  onChangeText={(text) => setName(text)}
                  icon="search"
                  onBlur={_findUser}
                  onSubmitEditing={_findUser}
                  iconColor={colors.grey}
                  placeholder="Search receiver here"
                  style={{
                    backgroundColor: colors.grey2,
                    paddingHorizontal: 10,
                    borderRadius: 12,
                  }}
                />
              </View>

              <Text style={styles.contactTitle}>All Contacts</Text>
              <Text style={styles.contactSubtitle}>
                {findUser.length} Contact Loaded
              </Text>

              <View style={{marginVertical: 14}}>
                <RenderFindUser />
                {more ? (
                  <TouchableWithoutFeedback
                    onPress={() => _loadFindUser()}
                    style={{marginVertical: 10, alignItems: 'center'}}>
                    <Text
                      style={{color: colors.primary, fontFamily: fonts.bold}}>
                      Load More
                    </Text>
                  </TouchableWithoutFeedback>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SearchReceiver;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },

  // Contact Container
  contactContainer: {
    marginBottom: 14,
    zIndex: 0,
  },
  contactTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginHorizontal: 16,
  },
  contactSubtitle: {
    fontSize: 16,
    fontFamily: fonts.regular,
    marginHorizontal: 16,
    color: colors.grey,
  },
});
