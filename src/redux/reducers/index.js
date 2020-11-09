import {combineReducers} from 'redux';
import Auth from './auth';
import Users from './users';

export default combineReducers({Auth, Users});
