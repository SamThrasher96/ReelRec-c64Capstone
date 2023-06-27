import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./movie.css";
import { Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const MovieList = ({ searchTermState }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();
  const localReelRecUser = localStorage.getItem("reelRec_user")
  const ReelRecUserObject = JSON.parse(localReelRecUser)

  const getMovies = () => {
    fetch(`http://localhost:8088/movies?_expand=genre&_expand=mpaRating&_expand=streamingService`)
      .then(response => response.json())
      .then((movieArray) => {
        setMovies(movieArray);
        setFilteredMovies(movieArray);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const searchedMovies = movies.filter(movie => {
      return movie.name.toLowerCase().startsWith(searchTermState.toLowerCase());
    });
    setFilteredMovies(searchedMovies);
  }, [searchTermState]);

  const addToWatchList = (movieId) => {
    const userId = ReelRecUserObject.id
    const watchListObject = {
      movieId: movieId,
      userId: userId,
      watchList: true
    };

    fetch(`http://localhost:8088/userWatchLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(watchListObject)
    })
      .then(response => response.json())
      .then(() => {
        // Success! You can perform any additional actions here
        console.log("Movie added to watch list");
      });
  };

  const deleteButton = (movieId) => {
    fetch(`http://localhost:8088/movies/${movieId}`, {
      method: "DELETE"
    })
      .then(() => {
        getMovies();
      });
  };

  return (
    <>
      <button onClick={() => navigate("/")}>Home</button>
      <h2>List of movies</h2>
      <article className="movies">
        {filteredMovies.map((movie) => {
          return (
            <section className="movie" key={`movie--${movie.id}`}>
              <header>Movie title:{movie.name}</header>
              <div>Genre: {movie.genre.genre}</div>
              <div>This movie is rated {movie.mpaRating.mpaRating}</div>
              <div>Streaming Service: {movie.streamingService.service}</div>
              <div>{movie.description}</div>
              <Button
                variant="contained"
                color="error"
                size="small"
                disableElevation
                startIcon={<DeleteOutlineIcon />}
                onClick={() => deleteButton(movie.id)}
              >
                Delete Movie
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation
                onClick={() => addToWatchList(movie.id)}
              >
                Add to Watch List
              </Button>
            </section>
          );
        })}
      </article>
    </>
  );
};


