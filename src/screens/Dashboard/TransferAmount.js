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
import Input from '../../components/Inputs/Input';
import InputBorderedBottom from '../../components/Inputs/InputBorderedBottom';
import CardReceiver from '../../components/Cards/CardReceiver';
import {currency} from '../../helpers/number';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('screen');

const TransferAmount = ({navigation, route}) => {
  const [amount, setAmount] = React.useState('');
  const [note, setNote] = React.useState('');
  const [editing, setEditing] = React.useState(false);
  const [error, setError] = React.useState('');
  const {
    userdata: {balance},
  } = useSelector((state) => state.Users);

  const _handleEdit = (text) => {
    setEditing(true);
    setAmount(text.split('.').join(''));
  };

  const _handleSubmit = () => {
    if (!amount) {
      return setError('Amount must be filled');
    } else if (!note) {
      return setError('Note must be filled');
      // eslint-disable-next-line radix
    } else if (balance < parseInt(amount)) {
      return setError("balance isn't enough");
    }
    setError('');
    navigation.navigate('TransferConfirm', {
      user: route.params,
      detail: {amount, note},
    });
  };

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
              title="Transfer"
            />

            <View style={{zIndex: 0}}>
              <CardReceiver
                src={route.params.photo}
                style={styles.cardReceiver}
                rippleColor={colors.transparent}
                name={route.params.name}
                phone={
                  route.params?.phone
                    ? `+62 ${route.params?.phone}`
                    : "The phone isn't set"
                }
              />
            </View>

            <Text style={styles.balanceInformation}>
              Rp{currency(balance)} Available
            </Text>

            <View style={styles.inputContainer}>
              <Input
                placeholder="0.00"
                textAlign="center"
                caretHidden={true}
                onBlur={() => setEditing(false)}
                onFocus={() => setEditing(true)}
                styleInput={styles.textInput}
                onChangeText={_handleEdit}
                keyboardType="numeric"
                onSubmitEditing={() => setEditing(false)}
                value={editing ? amount : currency(amount)}
              />
              <InputBorderedBottom
                onChangeText={(text) => setNote(text)}
                style={{marginTop: 30}}
                placeholder="Add some notes"
                icon="edit-2"
                value={note}
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
                  marginTop: error ? width / 2.5 : width / 2,
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

export default TransferAmount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.vanilla,
    paddingTop: StatusBar.currentHeight,
  },
  cardReceiver: {
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
    zIndex: 0,
  },
  balanceInformation: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.grey,
  },
  inputContainer: {
    width,
    paddingHorizontal: 16,
  },
  textInput: {
    width: '100%',
    fontSize: 42,
    fontFamily: fonts.bold,
    marginHorizontal: 0,
    color: colors.primary,
  },
});
