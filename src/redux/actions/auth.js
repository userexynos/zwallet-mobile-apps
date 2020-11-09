import {axios} from '../../helpers/constants';
import {patcher, SETAUTH, SETLOGOUT} from '../constants';

const AuthLogin = (data, callback) => (dispatch) => {
  return axios
    .post('/auth/login', data)
    .then((res) => {
      dispatch(patcher(SETAUTH, res.data.data));
      return callback(res, false);
    })
    .catch((error) => {
      callback(error.response, true);
    });
};

const AuthLogout = () => (dispatch) => {
  return dispatch(patcher(SETLOGOUT));
};

const AuthRegister = (data, callback) => (dispatch) => {
  return axios
    .post('/auth/register', data)
    .then((res) => callback(res, false))
    .catch((error) => callback(error.response, true));
};

const AuthCreatePin = (data, callback) => (dispatch) => {
  const {pin, token} = data;
  const dataPin = {pin};
  return axios
    .patch('/users/create_pin', dataPin, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => callback(res, false))
    .catch((error) => callback(error.response, true));
};
export {AuthLogin, AuthRegister, AuthCreatePin, AuthLogout};
