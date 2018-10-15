import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../UI/ModalContainer";
import About from "../Static/About";
import { FlatButton } from "../UI/FlatButton";
import { HeaderContainer, AppName, UserName, Nav } from "styles";

class Header extends Component {
  render() {
    const { user } = this.props;
    const loggedIn = Object.keys(user).length !== 0;

    return (
      <HeaderContainer>
        <AppName> REACT DIAGRAMMER </AppName>
        <UserName> {loggedIn && `Welcome back, ${user.name}`} </UserName>
        <Nav>
          <ModalContainer text="ABOUT" large>
            <About />
          </ModalContainer>
          {loggedIn ? (
            <Fragment>
              <FlatButton>
                <Link to="/logout">LOGOUT</Link>
              </FlatButton>
            </Fragment>
          ) : (
            <Fragment>
              <FlatButton>
                <Link to="/signup">SIGN UP</Link>
              </FlatButton>
              <FlatButton>
                <Link to="/login">LOGIN</Link>
              </FlatButton>
            </Fragment>
          )}
        </Nav>
      </HeaderContainer>
    );
  }
}

export default Header;
