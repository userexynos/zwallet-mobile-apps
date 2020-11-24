import {
  ADDFINDUSERDATA,
  ADDHISTORYDATA,
  SETBALANCE,
  SETFINDUSERDATA,
  SETHISTORYDATA,
  SETHISTORYIDDATA,
  SETTOPUPDATA,
  SETUSERDATA,
} from '../constants';

const initState = {
  userdata: {},
  histories: [],
  history: {},
  income: '',
  expense: '',
  topupGuide: [],
  findUser: [],
};

const usersReducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SETUSERDATA:
      return {...state, userdata: payload};
    case SETBALANCE:
      return {...state, userdata: {...state.userdata, balance: payload}};
    case SETHISTORYDATA:
      const {income, history, expense} = payload;
      return {...state, histories: history, income, expense};
    case ADDHISTORYDATA:
      return {...state, histories: [...state.histories, ...payload.history]};
    case SETHISTORYIDDATA:
      return {...state, history: payload};
    case SETTOPUPDATA:
      return {...state, topupGuide: payload};
    case SETFINDUSERDATA:
      return {...state, findUser: payload};
    case ADDFINDUSERDATA:
      return {...state, findUser: [...state.findUser, ...payload]};
    default:
      return state;
  }
};

export default usersReducer;
