import React from "react";
import { Navbar, Container, Dropdown, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../util/firebaseConfig";

const Nav = ({ setToken, setUser }) => {
  let history = useHistory();

  const logOut = () => {
    // Setting states
    setToken(null);
    setUser(null);
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  return (
    <Navbar bg="primary" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <h3 className="text-white">Invi-Chat</h3>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>

        <Button variant="danger" onClick={logOut}>
          {" "}
          Sign Out{" "}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Nav;
