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
} from 'react-native';
import {colors, fonts} from '../../helpers/constants';
import Toolbar from '../../components/Toolbars/Toolbar';
import Button from '../../components/Buttons/Button';
import CardReceiver from '../../components/Cards/CardReceiver';
import CardCustom from '../../components/Cards/CardCustom';
import {currency} from '../../helpers/number';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const {width} = Dimensions.get('screen');

const TransferConfirm = ({navigation, route}) => {
  const {user, detail} = route.params;
  const {
    userdata: {balance},
  } = useSelector((state) => state.Users);
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
              title="Confirmation"
            />

            <View style={styles.transferContainer}>
              <CardReceiver
                style={{borderRadius: 10, marginVertical: 6}}
                rippleColor={colors.transparent}
                name={user.name}
                phone={user.phone ? `+62 ${user.phone}` : "The phone isn't set"}
              />

              <Text style={styles.transferTitle}>Details</Text>
              <CardCustom
                style={styles.transfercard}
                title="Amount"
                subtitle={`Rp${currency(detail.amount)}`}
              />

              <CardCustom
                style={styles.transfercard}
                title="Balance Left"
                // eslint-disable-next-line radix
                subtitle={`Rp${currency(balance - parseInt(detail.amount))}`}
              />

              <CardCustom
                style={styles.transfercard}
                title="Date & Time"
                subtitle={moment().format('LL')}
              />

              <CardCustom
                style={styles.transfercard}
                title="Notes"
                subtitle={detail.note}
              />

              <Button
                style={{marginTop: width / 16, marginBottom: 10}}
                rippleColor={colors.dark}
                textColor={colors.white}
                backgroundColor={colors.primary}
                text="Continue"
                onPress={() =>
                  navigation.navigate('TransferPinInput', route.params)
                }
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TransferConfirm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  transferContainer: {
    marginHorizontal: 16,
    zIndex: 0,
  },
  transferTitle: {
    marginTop: 10,
    marginBottom: 6,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  transfercard: {
    borderRadius: 10,
    marginVertical: 6,
  },
});
