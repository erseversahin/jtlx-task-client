import {
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstant";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import axios from "axios";

export const login =
  (
    username: string,
    password: string
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    await axios
      .post(`${process.env.REACT_APP_JTLX_API_URL}/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("access_token", res.data.access_token);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data.userData,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });

    //pass data action
  };

export const logout =
  (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    dispatch({
      type: USER_LOGIN_LOGOUT,
    });

    await axios
      .get(`${process.env.REACT_APP_JTLX_API_URL}/auth/logout`, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        sessionStorage.setItem("access_token", "");
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
