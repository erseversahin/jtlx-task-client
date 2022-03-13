import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userAction";
import { LoginForm } from "../interfaces/user.interface";
import { USER_LOGIN_FAIL } from "../constants/userConstant";

const LoginScreen = () => {
  const userLogin = useSelector((state: any) => state.userLogin);
  let navigate = useNavigate();
  useEffect(() => {
    if (userLogin.login == true) navigate("/");
  }, []);

  const initialFormValues: LoginForm = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const dispatch = useDispatch();

  const loginHandle = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!formValues.username) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: "Please enter your username",
      });
    } else if (!formValues.password) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: "Please enter your password",
      });
    } else {
      await dispatch(login(formValues.username, formValues.password));
      navigate(`/`);
    }
  };

  const handleChange = (e: SyntheticEvent) => {
    const { name, value }: any = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <FormContainer formName="Login">
        {userLogin.error ? (
          <div className="alert alert-danger">
            <div className="alert-text font-weight-bold">{userLogin.error}</div>
          </div>
        ) : (
          ""
        )}

        <Form onSubmit={loginHandle}>
          <Form.Group className="my-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formValues.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Button
              disabled={userLogin.loading}
              variant="primary"
              type="submit"
              className="my-3 w-100"
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
