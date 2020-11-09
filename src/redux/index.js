import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Auth'],
};

const persistReducers = persistReducer(persistConfig, reducers);
const store = createStore(persistReducers, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
