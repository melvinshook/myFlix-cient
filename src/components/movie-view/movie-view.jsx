export const MovieView = ({movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.imagePath} width="300" height="500"  />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
            <span>Description: </span>
            <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <div>
            <span>Description:</span>
            <span>{movie.genre.description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div>
             <span>Bio:</span>   
            <span>{movie.director.bio}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};