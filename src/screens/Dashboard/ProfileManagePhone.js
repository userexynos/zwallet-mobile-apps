/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  ToastAndroid,
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';
import Toolbar from '../../components/Toolbars/Toolbar';
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import CardCustom from '../../components/Cards/CardCustom';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Modals/Loading';
import {DeletePhone} from '../../redux/actions/users';
import {patcher, SETUSERDATA} from '../../redux/constants';

const ProfileManagePhones = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const {token} = useSelector((state) => state.Auth);
  const {userdata} = useSelector((state) => state.Users);
  const dispatch = useDispatch();

  const _handleDeletePhone = () => {
    setLoading(true);
    const _callbackDeletePhone = (res, err) => {
      setLoading(false);
      if (err) {
        if (res) {
          return ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        }

        return ToastAndroid.show('Connection Refused', ToastAndroid.SHORT);
      }
      const data = {...userdata, phone: null};
      dispatch(patcher(SETUSERDATA, data));

      return navigation.pop();
    };
    dispatch(DeletePhone(token, _callbackDeletePhone));
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
              title="Manage Phone Number"
            />

            <View style={styles.profileContainer}>
              <Text style={styles.profileDesc}>
                You can only delete the phone number and then you must add
                another phone number.
              </Text>

              <CardCustom
                style={styles.profilecard}
                title="Primary"
                subtitle={
                  userdata?.phone ? `+62 ${userdata.phone}` : 'Add Phone Number'
                }>
                <ButtonIcon
                  icon="trash"
                  iconColor={colors.error}
                  iconSize={24}
                  rippleColor={colors.error}
                  onPress={_handleDeletePhone}
                />
              </CardCustom>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileManagePhones;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  profileContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  profileDesc: {
    fontSize: 14,
    fontFamily: fonts.regular,
    paddingBottom: 30,
    color: colors.grey,
  },
  profilecard: {
    borderRadius: 10,
    marginVertical: 6,
  },
});
