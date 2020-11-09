import React from 'react';
import Routes from './src/routes';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './src/redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-gesture-handler';

function App() {
  React.useEffect(() => SplashScreen.hide(), []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
