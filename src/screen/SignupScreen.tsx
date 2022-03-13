import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { User } from "../interfaces/user.interface";
import { validatePassword, validateEmail } from "../helpers/helper";
import axios from "axios";
import { USER_LOGIN_SUCCESS } from "../constants/userConstant";

const SignupScreen = () => {
  const initialFormValues: User = {
    name: "",
    surname: "",
    bornAt: "",
    about: "",
    email: "",
    balance: 0,
    password: "",
    phoneNumber: "",
    username: "",
  };
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpError, setSignUpError]: any = useState("");
  const [lat, setLat]: any = useState();
  const [lng, setLng]: any = useState();
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e: SyntheticEvent) => {
    const { name, value }: any = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleLat = (e: SyntheticEvent) => {
    e.preventDefault();
    const { value }: any = e.target;
    setLat(value);
  };

  const handleLng = (e: SyntheticEvent) => {
    e.preventDefault();
    const { value }: any = e.target;
    setLng(value);
  };
  const handleLatLng = (e: SyntheticEvent) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        function (error) {
          if (error.code == 1)
            alert(error.message + " Please check your browser settings");
          else alert(error.message);
        }
      );
    } else {
      alert("Tarayıcınızda konum özellikleri kullanılamıyor.");
    }
  };

  const signUpHandle = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!formValues.username) setSignUpError("Please enter your username");
    else if (!formValues.name) setSignUpError("Please enter your name");
    else if (!formValues.surname) setSignUpError("Please enter your surname");
    else if (!formValues.password) setSignUpError("Please enter your password");
    else if (!validatePassword(formValues.password))
      setSignUpError(
        "Your password must be at least 8 characters, with at least a symbol, upper and lower case letters and a number."
      );
    else if (!formValues.phoneNumber) setSignUpError("Please enter your phone");
    else if (!formValues.email) setSignUpError("Please enter your email");
    else if (!validateEmail(formValues.email))
      setSignUpError("Please provide a valid email.");
    else {
      setSignUpError("");
      await axios
        .post(`${process.env.REACT_APP_JTLX_API_URL}/auth/register`, {
          ...formValues,
          location: {
            type: "Point",
            coordinates: [lat, lng],
          },
        })
        .then((res) => {
          setSignUpError("");
          sessionStorage.setItem("access_token", res.data.access_token);
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data.userData,
          });
          navigate("/");
        })
        .catch((error) => {
          setSignUpError(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          );
        });
    }
  };

  return (
    <>
      <FormContainer formName="Sign Up">
        {signUpError ? (
          <div className="alert alert-danger">
            <div className="alert-text font-weight-bold">{signUpError}</div>
          </div>
        ) : (
          ""
        )}
        <Form onSubmit={signUpHandle}>
          <Row>
            <h6 className="my-3">Information</h6>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Username(*)</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your @username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Balance</Form.Label>
                <Form.Control
                  type="number"
                  name="balance"
                  placeholder="Enter your balance"
                  value={formValues.balance}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Name(*)</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your first name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Surname(*)</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  placeholder="Enter your last name"
                  value={formValues.surname}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Password(*)</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  name="bornAt"
                  type="date"
                  value={formValues.bornAt}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Phone(*)</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="my-3">
                <Form.Label>Email(*)</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <h6 className="my-3">GeoLocation</h6>
            <Col md={4}>
              <Form.Group className="my-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  disabled
                  name="latitude"
                  value={lat || 0}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="my-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  disabled
                  name="longitude"
                  value={lng || 0}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="my-3">
                <Form.Label>Get Current Position</Form.Label>
                <Button className="w-100" onClick={handleLatLng}>
                  Get
                </Button>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="my-3">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              name="about"
              value={formValues.about}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Button variant="primary" type="submit" className="my-3 w-100">
              Sign Up
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default SignupScreen;
