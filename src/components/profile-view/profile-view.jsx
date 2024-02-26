import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, setUser, token }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //creates an array with all the movies
  const favoriteMovies = movies.filter((m) =>
    user.favoriteMovies.includes(m._id)
  );

  //UPDATING PROFILE INFO
  const handleUpdate = (event) => {
    event.preventDefault();

    let data = {
      userName: userName,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(
      `https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/users/${user.userName}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => {
        console.log("response:", response);
        if (response.ok) {
          alert("update successful");
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        } else {
          const errorText = await response.text();
          // Read the response body as text
          console.log("Error response body:", errorText);
          alert("update failed");
        }
      })
      .catch((err) => console.log("error", err));
  };

  //DELETE ACCOUNT
  const deleteAccount = () => {
    fetch(
      `https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/users/${user.userName}`,
      {
        method: "DELETE",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        // setMovies(null);
        localStorage.clear();
        alert("your account has been deleted");
        window.location.replace("/login");
      } else {
        alert("could not delete account");
      }
    });
  };

  return (
    <>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <CardGroup>
              <Card className="mb-5 border border-0 card-custom">
                <Card.Body>
                  <Card.Title>My Profile</Card.Title>
                  <Card.Text>Want to update your information?</Card.Text>
                  <Form onSubmit={handleUpdate}>
                    <Form.Group>
                      <Form.Label>
                        Username:
                        <Form.Control
                          type="text"
                          value={userName}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          // required
                          placeholder={user.userName}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Password:
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          // required
                          placeholder="*******"
                        />
                      </Form.Label>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>
                        Email:
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          // required
                          placeholder={user.email}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Birthday:
                        <Form.Control
                          type="date"
                          value={birthday}
                          onChange={(e) => {
                            setBirthday(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleUpdate}
                      className="text-white mt-4"
                    >
                      update profile
                    </Button>
                  </Form>
                  <Link to="/login">
                    <Button
                      variant="danger"
                      type=""
                      onClick={deleteAccount}
                      className="text-white mt-3"
                    >
                      delete your account
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-md-center align-items-center">
          <Form.Label>Favorite Movies:</Form.Label>
          {favoriteMovies.map((movie) => {
            return (
              <Col
                key={movie._id}
                className="mb-4 justify-content-center align-items-center d-flex"
              >
                <MovieCard
                  movie={movie}
                  isFavorite={user.favoriteMovies.includes(movie._id)}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
