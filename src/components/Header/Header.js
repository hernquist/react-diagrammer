import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ModalContainer from '../UI/ModalContainer';
import About from '../Static/About';
import { FlatButton } from '../UI/FlatButton';
import { 
  HeaderContainer, 
  AppName, 
  Nav, 
  TitlesContainer as Titles 
} from 'styles';
import UserName from './Username';

class Header extends Component {
  render() {
    const { user } = this.props;
    const loggedIn = Object.keys(user).length !== 0;

    return (
      <HeaderContainer>
        <Titles>
          <AppName>REACT DIAGRAMMER</AppName>
          <UserName visible={loggedIn} userName={user.name} />
        </Titles>
        <Nav>
          <ModalContainer text='ABOUT' large>
            <About />
          </ModalContainer>
          {loggedIn ? (
            <Fragment>
              <FlatButton>
                <Link to='/logout'>LOGOUT</Link>
              </FlatButton>
            </Fragment>
          ) : (
            <Fragment>
              <FlatButton>
                <Link to='/signup'>SIGN UP</Link>
              </FlatButton>
              <FlatButton>
                <Link to='/login'>LOGIN</Link>
              </FlatButton>
            </Fragment>
          )}
        </Nav>
      </HeaderContainer>
    );
  }
}

export default Header;
