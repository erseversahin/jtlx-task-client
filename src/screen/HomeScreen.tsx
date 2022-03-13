import React from "react";
import { useSelector } from "react-redux";
import UserList from "../components/user/UserList";
import { LoginUserState } from "../interfaces/user.interface";
import { RootState } from "../store";

const HomeScreen = () => {
  const userLogin = useSelector((state: any) => state.userLogin);

  console.log(userLogin);

  return (
    <>
      {userLogin.userInfo && userLogin.userInfo.username ? (
        <UserList />
      ) : (
        <UserList />
      )}
    </>
  );
};

export default HomeScreen;
