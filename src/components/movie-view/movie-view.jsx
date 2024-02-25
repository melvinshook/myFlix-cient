import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, removeFav, addFav }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <Card>
            <Card.Img src={movie.imagePath} />
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>

            <Card.Title>Genre:</Card.Title>
            <Card.Text>{movie.genre.name}</Card.Text>
            <Card.Text>{movie.genre.description}</Card.Text>

            <Card.Title>Director</Card.Title>
            <Card.Text>{movie.director.name}</Card.Text>
            <Card.Text>{movie.director.bio}</Card.Text>
            <div>
              {user.favoriteMovies.includes(movie._id) ? (
                <Button
                  className="add-fav-btn"
                  onClick={() => addFav(movie._id)}
                >
                  Add to favorites
                </Button>
              ) : (
                <Button
                  className="remove-fav-btn"
                  on
                  onClick={() => removeFav(movie._id)}
                >
                  Remove from favorites
                </Button>
              )}
            </div>

            <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
