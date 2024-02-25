import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MovieCard = ({ movie }) => {
  /* useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]); */

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
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
