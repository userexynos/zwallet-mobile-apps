import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Main,
  Transactions,
  History,
  SearchReceiver,
  TransferAmount,
  TransferConfirm,
  TransferPinInput,
  TransferStatus,
  Topup,
  Profile,
  ProfileInfo,
  ProfilePin,
  ProfilePassword,
  ProfilePhone,
  ProfileManagePhone,
  Notification,
} from '../screens/Dashboard';
import {fromLeft} from './Transition';

const Stack = createStackNavigator();

function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      headerMode
      screenOptions={fromLeft}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="SearchReceiver" component={SearchReceiver} />
      <Stack.Screen name="TransferAmount" component={TransferAmount} />
      <Stack.Screen name="TransferConfirm" component={TransferConfirm} />
      <Stack.Screen name="TransferPinInput" component={TransferPinInput} />
      <Stack.Screen name="TransferStatus" component={TransferStatus} />
      <Stack.Screen name="Topup" component={Topup} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen name="ProfilePin" component={ProfilePin} />
      <Stack.Screen name="ProfilePassword" component={ProfilePassword} />
      <Stack.Screen name="ProfileManagePhone" component={ProfileManagePhone} />
      <Stack.Screen name="ProfilePhone" component={ProfilePhone} />
      <Stack.Screen name="Notification" component={Notification} />
    </Stack.Navigator>
  );
}

export default Auth;
