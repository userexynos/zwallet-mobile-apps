/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';
import Toolbar from '../../components/Toolbars/Toolbar';
import CardCustom from '../../components/Cards/CardCustom';
import {useSelector} from 'react-redux';

const ProfileInfo = ({navigation}) => {
  const {userdata} = useSelector((state) => state.Users);
  const _handlePhone = () => {
    // navigation.navigate('ProfileManagePhone');
    userdata?.phone
      ? navigation.navigate('ProfileManagePhone')
      : navigation.navigate('ProfilePhone');
  };
  const nameSplit = userdata.name.split(' ');
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
            style={{height: '100%'}}
            stickyHeaderIndices={[0]}>
            <Toolbar
              backgroundColor={colors.vanilla}
              navigation={navigation}
              title="Personal Information"
            />

            <View style={styles.profileContainer}>
              <Text style={styles.profileDesc}>
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support.
              </Text>

              {userdata.name.match(' ') ? (
                <>
                  <CardCustom
                    style={styles.profilecard}
                    title="First Name"
                    subtitle={nameSplit.slice(0, nameSplit.length - 1).join('')}
                  />
                  <CardCustom
                    style={styles.profilecard}
                    title="Last Name"
                    subtitle={nameSplit[nameSplit.length - 1]}
                  />
                </>
              ) : (
                <CardCustom
                  style={styles.profilecard}
                  title="Full Name"
                  subtitle={userdata.name}
                />
              )}
              <CardCustom
                style={styles.profilecard}
                title="Verified E-mail"
                subtitle={userdata.email}
              />
              <CardCustom
                style={styles.profilecard}
                rippleColor={colors.rippleDark}
                title="Phone Number"
                subtitle={
                  userdata?.phone ? `+62 ${userdata.phone}` : 'Add Phone Number'
                }
                onPress={_handlePhone}>
                <Text style={{color: colors.primary}}>Manage</Text>
              </CardCustom>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileInfo;

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
