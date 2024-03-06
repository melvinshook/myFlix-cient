import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(
    user && user.favoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    if (
      user &&
      user.favoriteMovies &&
      user.favoriteMovies.includes(movie._id)
    ) {
      setIsFavorite(true);
    }
  }, [user, movie._id]);

  // add favorite movie

  const addFavoriteMovie = () => {
    fetch(
      `https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/users/${user.userName}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Could not add moive to favorites");
          console.log("Failed to add favorite movie");
          console.log(movie._id);
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/users/${user.userName}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text>{movie.genre.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Card.Body className="favorite-btns">
          {!isFavorite ? (
            <Button
              className="fav-btn"
              onClick={addFavoriteMovie}
              style={{ cursor: "pointer" }}
            >
              Add to favorites
            </Button>
          ) : (
            <Button
              className="fav-btn"
              variant="danger"
              onClick={removeFavoriteMovie}
              style={{ cursor: "pointer" }}
            >
              Remove from favorites
            </Button>
          )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
