import {SETAUTH, SETLOGOUT} from '../constants';

const initState = {
  token: '',
  role: '',
};

const authReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SETAUTH:
      const {token, role} = payload;
      return {...state, token, role};

    case SETLOGOUT:
      return {...state, token: '', role: ''};

    default:
      return state;
  }
};

export default authReducer;
