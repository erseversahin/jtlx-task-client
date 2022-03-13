import {
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstant";
import { LoginUserState } from "../interfaces/user.interface";
import { Action } from "../interfaces/action.interface";

export const userLoginReducer = (state: LoginUserState, action: Action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, login: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_LOGOUT:
      return { loading: false, login: false, userInfo: {} };
    default:
      return { loading: false, login: false, userInfo: {} };
  }
};
