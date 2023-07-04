import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export const RandomMovieDetails = () => {
  const { movieId } = useParams();
  const [randomlySelectedMovie, updateRandomlySelectedMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/movies/${movieId}?_expand=genre&_expand=mpaRating&_expand=streamingService`)
      .then((response) => response.json())
      .then((singleMovie) => {
        updateRandomlySelectedMovie(singleMovie);
      });
  }, [movieId]);

  return (
    <Card sx={{ maxWidth: 650, margin: "auto" }}>
      <CardMedia component="img" height={600} width={300} image={randomlySelectedMovie.image} alt={randomlySelectedMovie.name} />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Movie title: {randomlySelectedMovie.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Genre: {randomlySelectedMovie.genre?.genre}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This movie is rated {randomlySelectedMovie.mpaRating?.mpaRating}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Streaming Service: {randomlySelectedMovie.streamingService?.service}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          {randomlySelectedMovie.description}
        </Typography>
      </CardContent>
    </Card>
  );
};