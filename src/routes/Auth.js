import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  Register,
  RegisterPin,
  RegisterSuccess,
  ResetPassword,
  ResetPasswordProcess as ResetProcess,
} from '../screens/Auth';
import {fromLeft} from './Transition';

const Stack = createStackNavigator();

function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode
      screenOptions={fromLeft}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ResetProcess" component={ResetProcess} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterPin" component={RegisterPin} />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
    </Stack.Navigator>
  );
}

export default Auth;
