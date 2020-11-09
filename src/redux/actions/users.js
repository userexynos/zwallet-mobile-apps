import {axios} from '../../helpers/constants';
import {
  ADDFINDUSERDATA,
  ADDHISTORYDATA,
  patcher,
  SETFINDUSERDATA,
  SETHISTORYDATA,
  SETHISTORYIDDATA,
  SETTOPUPDATA,
  SETUSERDATA,
} from '../constants';

const UserLoad = (data, callback) => (dispatch) => {
  axios
    .get('/users/detail', {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    })
    .then((res) => {
      dispatch(patcher(SETUSERDATA, res.data.data));
      callback(res, false);
    })
    .catch((error) => callback(error.response, true));
};

const Histories = (data, callback) => (dispatch) => {
  const {token, offset, reset} = data;
  axios
    .get(`/users/histories?offset=${offset}&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (reset) {
        dispatch(patcher(SETHISTORYDATA, res.data.data));
      } else {
        dispatch(patcher(ADDHISTORYDATA, res.data.data));
      }
      callback(res, false);
    })
    .catch((error) => callback(error.response, false));
};

const GuideTopup = (data, callback) => (dispatch) => {
  axios
    .get('/users/guide-topup', {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    })
    .then((res) => {
      dispatch(patcher(SETTOPUPDATA, res.data.data));
      callback(res, false);
    })
    .catch((error) => callback(error.response, true));
};

const DeletePhone = (data, callback) => () => {
  axios
    .delete('/users/phone', {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    })
    .then((res) => callback(res, false))
    .catch((error) => callback(error.response, true));
};

const AddPhone = (data, callback) => () => {
  const {phone, token} = data;
  axios
    .patch(
      '/users/phone',
      {phone},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => callback(res, false))
    .catch((error) => callback(error.response, true));
};

const ChangePassword = (data, callback) => () => {
  const {password, passwordNew, token} = data;
  axios
    .patch(
      '/users/password',
      {password, passwordNew},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => callback(res, false))
    .catch((error) => callback(error.response, true));
};

const ChangePhoto = (data, callback) => () => {
  const {photo, token} = data;
  axios
    .post('/users/photo', photo, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => callback(res, false))
    .catch((error) => callback(error.response, true));
};

const FindUser = (data, callback) => (dispatch) => {
  const {token, name, offset, reset} = data;
  axios
    .get(`/users/search?q=${name}&offset=${offset}&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (reset) {
        dispatch(patcher(SETFINDUSERDATA, res.data.data));
      } else {
        dispatch(patcher(ADDFINDUSERDATA, res.data.data));
      }
      callback(res, false);
    })
    .catch((error) => callback(error.response, false));
};

const BalanceTransfer = (data, callback) => () => {
  const {token} = data;
  axios
    .post('/users/transfer', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => callback(res, false))
    .catch((error) => callback(error.response, true));
};

const HistoryByID = (data, callback) => (dispatch) => {
  const {id, token} = data;
  axios
    .get(`/users/history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(patcher(SETHISTORYIDDATA, res.data.data));
      callback(res, false);
    })
    .catch((error) => callback(error.response, false));
};

const FilterHistory = (data, callback) => (dispatch) => {
  const {token, filter, offset, reset} = data;
  axios
    .get(`/users/histories?offset=${offset}&limit=5&filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (reset) {
        dispatch(patcher(SETHISTORYDATA, res.data.data));
      } else {
        dispatch(patcher(ADDHISTORYDATA, res.data.data));
      }
      callback(res, false);
    })
    .catch((error) => callback(error.response, false));
};

export {
  UserLoad,
  Histories,
  GuideTopup,
  DeletePhone,
  AddPhone,
  ChangePassword,
  ChangePhoto,
  FindUser,
  BalanceTransfer,
  HistoryByID,
  FilterHistory,
};
