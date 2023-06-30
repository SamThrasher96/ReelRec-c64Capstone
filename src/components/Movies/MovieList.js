import React, { useEffect, useState } from "react";
import "./movie.css";
import { Button, Card, CardContent, CardMedia, Grid, Typography, CardActions } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const MovieList = ({ searchTermState }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const ReelRecUserObject = JSON.parse(localReelRecUser);

  const getMovies = () => {
    fetch(`http://localhost:8088/movies?_expand=genre&_expand=mpaRating&_expand=streamingService`)
      .then(response => response.json())
      .then((movieArray) => {
        const sortedMovies = movieArray.sort((a, b) => a.name.localeCompare(b.name));
        setMovies(sortedMovies);
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
    const userId = ReelRecUserObject.id;
    const watchListObject = {
      movieId: movieId,
      userId: userId,
      watchList: true,
      favorite: false
    };

    fetch(`http://localhost:8088/userWatchListAndFavorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(watchListObject)
    })
      .then(response => response.json())
      .then(() => {
        console.log("Movie added to watch list");
      });
  };

  const addToFavoriteList = (movieId) => {
    const userId = ReelRecUserObject.id;
    const favoriteListObject = {
      movieId: movieId,
      userId: userId,
      watchList: false,
      favorite: true
    };

    fetch(`http://localhost:8088/userWatchListAndFavorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(favoriteListObject)
    })
      .then(response => response.json())
      .then(() => {
        console.log("Movie added to favorite list");
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
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={`movie--${movie.id}`}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", margin: "10px" }}>
              <CardMedia
                component="img"
                height="650"
                image={movie.image}
                alt={movie.name}
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  {movie.name}
                </Typography>
                <Typography variant="body2" align="center">
                  Genre: {movie.genre.genre}
                </Typography>
                <Typography variant="body2" align="center">
                  This movie is rated {movie.mpaRating.mpaRating}
                </Typography>
                <Typography variant="body2" align="center">
                  Streaming Service: {movie.streamingService.service}
                </Typography>
                <Typography variant="body2" align="center">
                  {movie.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center"}}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => deleteButton(movie.id)}
                >
                  Delete Movie
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => addToWatchList(movie.id)}
                >
                  Add to Watch List
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={() => addToFavoriteList(movie.id)}
                >
                  Add to Favorite List
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};