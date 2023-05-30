import React, { useState, useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import "./LoginScreen.css"
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../actions/userActions";

const LoginScreen = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();


    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    // userInfo to check whether the user is alreaady logged in or not

    useEffect(() => {
        // if the user is already logged in re-direct the user to /mynotes Page

        if(userInfo){
            history.push('/mynotes');
        }

    }, [history, userInfo])
    

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(login(email, password));
        
    }

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <Loading/> }
        <Form onSubmit = {submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="my-2" variant="primary" type="submit">
            Submit
          </Button>
        </Form> 
        <Row className="py-1">
          <Col className='end'>
            New User ? <Link to="/register" className='login'>Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
    
  )
}

export default LoginScreen