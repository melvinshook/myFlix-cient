import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedin }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the web browser default behavior of reloading the entire page
    event.preventDefault();

    const data = {
      userName: userName,
      password: password,
    };

    fetch("https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedin(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
