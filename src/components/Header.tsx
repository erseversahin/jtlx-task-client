import React, { SyntheticEvent } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userAction";

const Header = () => {
  let navigate = useNavigate();
  const userLogin = useSelector((state: any) => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandle = async (e: SyntheticEvent) => {
    e.preventDefault();

    await dispatch(logout());

    navigate(`/login`);
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Jetlexa Task
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userLogin.userInfo && userLogin.userInfo.username ? (
              <Nav className="ms-auto">
                <Nav.Link onClick={logoutHandle} as={Button}>
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
