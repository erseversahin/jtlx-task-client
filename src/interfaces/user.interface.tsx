import { string } from "yup";

export interface User {
  name: string;
  surname: string;
  bornAt: string;
  about: string;
  email: string;
  balance: number;
  password: string;
  phoneNumber: number | string;
  username: string;
}

export interface UserLoggedIn {
  email: string;
  username: string;
  _id: string;
}

export interface LoginUserState {
  login?: boolean;
  loading?: boolean;
  error?: string;
  userInfo?: UserLoggedIn;
}

export interface LoginForm {
  username: string;
  password: string;
}
