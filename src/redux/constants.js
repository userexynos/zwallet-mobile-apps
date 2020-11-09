export const SETAUTH = 'SETAUTH';
export const SETLOGOUT = 'SETLOGOUT';
export const SETUSERDATA = 'SETUSERDATA';
export const SETBALANCE = 'SETBALANCE';
export const SETHISTORYDATA = 'SETHISTORYDATA';
export const ADDHISTORYDATA = 'ADDHISTORYDATA';
export const SETTOPUPDATA = 'SETTOPUPDATA';
export const SETFINDUSERDATA = 'SETFINDUSERDATA';
export const ADDFINDUSERDATA = 'ADDFINDUSERDATA';
export const SETFINDIDDATA = 'SETFINDIDDATA';
export const SETHISTORYIDDATA = 'SETHISTORYIDDATA';
export const SETPHOTO = 'SETPHOTO';
export const SETPHONE = 'SETPHONE';

export const patcher = (constant, payload = null) => ({
  type: constant,
  payload: payload,
});
