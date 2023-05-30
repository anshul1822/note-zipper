import React from "react";
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/userActions";

const style = {
  height : "10vh",
  width : "10vh"
};

function Header({setSearch}) {

  const history = useHistory();

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  }

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
      <Navbar.Brand>
        <Link to='/'>
          Note-Zipper
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" 
              onChange={ (e) => setSearch(e.target.value)}/>
        </Form>
        </Nav>
        {
          userInfo ? <>
          <Navbar style={{color:'white', border: 'none'}} >
            <Link to="/mynotes">My Notes</Link>
            <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>Logout </NavDropdown.Item>
            </NavDropdown>
            <img src={userInfo.pic} alt={userInfo.name} style={style} />
          </Navbar> 
          </>
          :
          <>
          <Link style={{color:'white', border: 'none'}} to="/login">Login</Link>
          </>

        }
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
