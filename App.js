import React from 'react';
import Routes from './src/routes';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

function App() {
  React.useEffect(() => SplashScreen.hide(), []);
  return <Routes />;
}

export default App;
