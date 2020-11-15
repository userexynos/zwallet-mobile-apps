import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Auth from './Auth';
import Dashboard from './Dashboard';

const Stack = createStackNavigator();

function Routes() {
  const [route, setRoute] = React.useState('Auth');
  const {token} = useSelector((state) => state.Auth);

  React.useEffect(() => {
    if (token) {
      setRoute('Dashboard');
    }
  }, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={config} initialRouteName={route}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const config = {
  headerShown: false,
};

export default Routes;
