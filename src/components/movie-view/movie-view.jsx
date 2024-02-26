import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie._id === movieId);
  console.log(movieId);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <Card>
            <Card.Img src={movie.imagePath} />
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie._id}</Card.Text>
            <Card.Text>{movie.description}</Card.Text>

            <Card.Title>Genre:</Card.Title>
            <Card.Text>{movie.genre.name}</Card.Text>
            <Card.Text>{movie.genre.description}</Card.Text>

            <Card.Title>Director</Card.Title>
            <Card.Text>{movie.director.name}</Card.Text>
            <Card.Text>{movie.director.bio}</Card.Text>

            <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
