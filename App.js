import React from 'react';
import Routes from './src/routes';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './src/redux';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {ToastAndroid} from 'react-native';

function App() {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remote) =>
      ToastAndroid.show(remote.notification.title, ToastAndroid.LONG),
    );
    return unsubscribe;
  }, []);

  const _loadPersist = () => setTimeout(() => SplashScreen.hide(), 1500);
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={_loadPersist}
        persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
