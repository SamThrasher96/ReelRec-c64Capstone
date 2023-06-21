import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const RandomMovieDetails = () => {
  const { movieId } = useParams();
  const [randomlySelectedMovie, updateRandomlySelectedMovie] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8088/movies/${movieId}?_expand=genre&_expand=mpaRating&_expand=streamingService`)
      .then(response => response.json())
      .then((singleMovie) => {
        updateRandomlySelectedMovie(singleMovie);
      })
  }, [movieId]);

  return (
    
    <section className="movie" key={`movie--${randomlySelectedMovie?.id}`}>
      <header>Movie title: {randomlySelectedMovie?.name}</header>
      <div>Genre: {randomlySelectedMovie?.genre?.genre}</div>
      <div>This movie is rated {randomlySelectedMovie?.mpaRating?.mpaRating}</div>
      <div>Streaming Service: {randomlySelectedMovie?.streamingService?.service}</div>
      <div>{randomlySelectedMovie?.description}</div>
    </section>
  );
};