import axios from "axios";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    axios
      .post("https://ecommerce-api-react.herokuapp.com/api/v1/users", data)
      .then((res) => {
        alert("user created");
        navigate("/login")
      })
      .catch((error) => {
        if (error.response.status == 400) {
          alert("user already exists");
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
        <h2 className=" fw-bold">
          <i>Sign in</i>
        </h2>

        <Form.Group className="my-3 " style={{ width: "400px" }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required {...register("email")} />
        </Form.Group>

        <Form.Group className="mb-3" style={{ width: "400px" }}>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" required {...register("firstName")} />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: "400px" }}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" required {...register("lastName")} />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: "400px" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            required
            {...register("password")}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: "400px" }}>
          <Form.Label>Phone (10 characters)</Form.Label>
          <Form.Control type="text" required {...register("phone")} />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Sing up
        </Button>
        <p className="py-3">
          Already have an account? <Link to="/login"> Log in</Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignIn;
