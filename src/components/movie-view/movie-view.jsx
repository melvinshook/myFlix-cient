import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

export const MovieView = ({ movie, onBackClick }) => {
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

            <Button
              onClick={onBackClick}
              className="back-button"
              style={{ cursor: "pointer" }}
            >
              Back
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
