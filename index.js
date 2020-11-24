/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async (remoteApp) => remoteApp);
AppRegistry.registerComponent(appName, () => App);
