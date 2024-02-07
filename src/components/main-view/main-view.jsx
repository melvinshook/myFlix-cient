import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";  



export const MainView = () => {
    const [movies, setMovies] = useState([]);



    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/movies")
        .then ((response) => response.json())
        .then((data) => {
            console.log("movies from api:", data);
            const moviesFromApi = data.map((movie) => {
                return { 
                    _id: movie._id,
                    title: movie.title,
                    description: movie.description,
                    genre: {
                      name: movie.genre.name,
                      description: movie.genre.description
                    },
                    director: {
                      name: movie.director.name,
                      bio: movie.director.bio
                    },
                    actors: movie.actors,
                    imagePath: movie.imagePath
                    
                }
            });
            setMovies(moviesFromApi);
                });
        }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    
    if (movies.length === 0) {
        return <div>The list is empty!</div>
    }
    
    return (
        <div>
            {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
            }}
            />
            ))}
        </div>
    );
};