import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";  




export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Step Brothers",
            image: "https://www.imdb.com/title/tt0838283/mediaviewer/rm3433645824/?ref_=tt_ov_i",
            description: "Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.",
            genre: "Comedy",
            director: "Adam McKay"
        },
        {
            id: 2,
            title: "Pulp Ficton",
            image: "https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i",
            description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            genre: "Drama",
            director: "Quentin Tarantino"
        },
        {
            id: 3,
            title: "Fight Club",
            image: "https://www.imdb.com/title/tt0137523/mediaviewer/rm1412004864/?ref_=tt_ov_i",
            description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
            genre: "Drama",
            director: "David Fincher"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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