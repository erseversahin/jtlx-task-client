import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import SignupScreen from "./screen/SignupScreen";
import LoginScreen from "./screen/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_LOGIN_SUCCESS } from "./constants/userConstant";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <RequireAuth>
                    <HomeScreen />
                  </RequireAuth>
                }
              />

              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/login" element={<LoginScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      axios
        .get(`${process.env.REACT_APP_JTLX_API_URL}/auth/verify`, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          sessionStorage.setItem("access_token", res.data.access_token);
          sessionStorage.setItem("verify", Date.now().toString());
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data.userData,
          });
        })
        .catch((error) => {
          sessionStorage.setItem("access_token", "");
          navigate("/login");
        });
    } else {
      sessionStorage.setItem("access_token", "");
      navigate("/login");
    }
  });

  return children;
}

export default App;
