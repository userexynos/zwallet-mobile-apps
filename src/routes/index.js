import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
import Splash from '../screens/Splash';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={config} name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const config = {
  headerShown: false,
};

export default Routes;
