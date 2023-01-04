import axios from "axios";
import React from "react";
import {Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIslogin } from "../store/slices/isLogin.slice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (data) => {
    axios
      .post(
        "https://e-commerce-api.academlo.tech/users/login",
        data
      )
      .then((res) => {
        alert(`Welcome ${res.data.data.user.firstName}`);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", res.data.data.user.firstName);
        localStorage.setItem("lastName", res.data.data.user.lastName);
        navigate("/")
        dispatch(setIslogin(true));
      })
      .catch((error) => {
        if (error.response.status == 404) {
        alert("invalid credentials");
      }
      console.log(error.response);
    });
    
  };
  return (
    <Container
      style={{ marginTop: "100px" }}
      className="d-flex justify-content-center"
    >
      
      <Form onSubmit={handleSubmit(submit)} className="">
        <h2 className="fw-bold"><i>Log in </i></h2>
        <Card
          bg="info"
          text='white'
          style={{ width: '18rem' }}
          className="mb-2 my-4 mx-auto"
        >
          <Card.Body >
            <Card.Title className="text-center fw-bold"> Test data</Card.Title>
            <Card.Text>
              <p ><i className="fa-solid fa-envelope"></i><span className="ms-3"> javier@gmail.com</span></p>
              <p><i className="fa-solid fa-lock"></i>  <span className="ms-3">javier1234</span></p>
            </Card.Text>
          </Card.Body>
        </Card>
        <Form.Group
          className="my-2 "
          style={{ width: "400px" }}
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            {...register("email")}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ width: "400px" }}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            required
            {...register("password")}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Continue
        </Button>
        
        <p className="my-2 ">Don't have an account? <Link to="/signin">Sign up</Link> </p>
      </Form>
      
    </Container>
  );
};

export default Login;
