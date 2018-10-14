import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ModalContainer from "../UI/ModalContainer";
import "../../styles/Header.css";
import About from "../Static/About";
import { FlatButton } from "../UI/FlatButton";

class Header extends Component {
  render() {
    const { user } = this.props;
    const loggedIn = Object.keys(user).length !== 0;

    return (
      <div className="header-container">
        <div className="app-name"> REACT DIAGRAMMER </div>
        <div className="user-name">
          {" "}
          {loggedIn && `Welcome back, ${user.name}`}{" "}
        </div>
        <div className="nav">
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
        </div>
      </div>
    );
  }
}

export default Header;
