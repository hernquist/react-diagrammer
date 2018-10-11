import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../ui/ModalContainer';
import '../../styles/Header.css';

class Header extends Component {
  render() {
    const {user} = this.props;
    const loggedIn = Object.keys(user).length !== 0;
    
    return <div className="header-container">
      <div className="app-name"> REACT DIAGRAMMER </div>
      <div className="user-name"> {loggedIn && `Welcome back, ${user.name}`} </div>
      {loggedIn ? <div className="nav">
        <Modal text="modal"><h3>About Page</h3></Modal>
        <div className="button">
          <Link to="/logout">LOGOUT</Link>
        </div>
      </div> : <div className="nav">
        <div className="button">
          <Link to="/signup">SIGN UP</Link>
        </div>
        <div className="button">
          <Link to="/login">LOGIN</Link>
        </div>
      </div>}
    </div>;
  }
}

export default Header;