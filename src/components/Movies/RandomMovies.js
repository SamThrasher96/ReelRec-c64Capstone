import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

export const RandomMovieGenerator = () => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [movieGenre, setMovieGenre] = useState([]);
  const [streamingService, setStreamingService] = useState([]);
  const [mpaRating, setMpaRating] = useState([]);
  const [userWatchListAndFavorites, setUserWatchListAndFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false); 
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const ReelRecUserObject = JSON.parse(localReelRecUser);

  const getMovies = () => {
    fetch("http://localhost:8088/movies?_expand=genre&_expand=mpaRating&_expand=streamingService")
      .then(response => response.json())
      .then((movieArray) => {
        setMovies(movieArray)
      })
  }

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8088/genres`)
      .then(response => response.json())
      .then((genresArray) => {
        setMovieGenre(genresArray)
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8088/streamingServices`)
      .then(response => response.json())
      .then((streamingServicesArray) => {
        setStreamingService(streamingServicesArray)
      })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8088/mpaRatings`)
      .then(response => response.json())
      .then((mpaRatingArray) => {
        setMpaRating(mpaRatingArray)
      })
  }, [])

  useEffect(() => {
    fetch("http://localhost:8088/userWatchListAndFavorites")
      .then(response => response.json())
      .then((watchListArray) => {
        setUserWatchListAndFavorites(watchListArray)
      })
  }, [])

  const generateRandomMovie = () => {
    let filteredMovies = movies;
    if (filterCategory && filterValue) { // eslint-disable-next-line
      filteredMovies = movies.filter(movie => {
        if (filterCategory === "genre") { // eslint-disable-next-line
          return movie.genreId == filterValue
        } else if (filterCategory === "streamingService") { // eslint-disable-next-line
          return movie.streamingServiceId == filterValue
        } else if (filterCategory === "mpaRating") { // eslint-disable-next-line
          return movie.mpaRatingId == filterValue
        }
      })
    }

    if (filteredMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMovies.length)
      const randomMovie = filteredMovies[randomIndex]
      setRandomMovie(randomMovie)
    } else {
      setRandomMovie(null)
    }
  }

  const generateRandomMovieFromWatchList = () => {
    const userWatchList = userWatchListAndFavorites.filter(
      (item) => item.userId === ReelRecUserObject.id && item.watchList
    );

    if (userWatchList.length > 0) {
      const randomIndex = Math.floor(Math.random() * userWatchList.length);
      const randomMovieId = userWatchList[randomIndex].movieId;
      const randomMovie = movies.find((movie) => movie.id === randomMovieId);
      setRandomMovie(randomMovie);
    } else {
      setRandomMovie(null);
    }
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
    setFilterValue("");
  }

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  }

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  }

  const handleGenerateWithFilters = () => {
    generateRandomMovie();
    setShowFilters(false);
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '16px', paddingBottom: '16px' }}>
        <Button variant="contained" size="large" sx={{ flex: 1 }} onClick={generateRandomMovie}>
          Generate Random Movie
        </Button>
        <Button variant="contained" size="large" sx={{ flex: 1 }} color="secondary" onClick={generateRandomMovieFromWatchList}>
          Generate Random Movie from Watch List
        </Button>
        <Button variant="contained" size="large" sx={{ flex: 1 }} onClick={handleShowFilters}>
          Generate a random movie with filters.
        </Button>
      </Box>

      {showFilters && (
        <div>
          <div>
            <label htmlFor="filterCategory">Filter Category:</label>
            <select id="filterCategory" value={filterCategory} onChange={handleFilterCategoryChange}>
              <option value="">Select Category</option>
              <option value="genre">Genre</option>
              <option value="streamingService">Streaming Service</option>
              <option value="mpaRating">MPA Rating</option>
            </select>
          </div>

          {filterCategory && (
            <div>
              <label htmlFor="filterValue">Filter Value:</label>
              {filterCategory === "genre" && (
                <select id="filterValue" value={filterValue} onChange={handleFilterValueChange}>
                  <option value="">Select Genre</option>
                  {movieGenre.map(item => (
                    <option value={item.id} key={item.id}>{item.genre}</option>
                  ))}
                </select>
              )}
              {filterCategory === "streamingService" && (
                <select id="filterValue" value={filterValue} onChange={handleFilterValueChange}>
                  <option value="" defaultValue>Select Streaming Service</option>
                  {streamingService.map(item => (
                    <option value={item.id} key={item.id}>{item.service}</option>
                  ))}
                </select>
              )}
              {filterCategory === "mpaRating" && (
                <select id="filterValue" value={filterValue} onChange={handleFilterValueChange}>
                  <option value="" defaultValue>Select MPA Rating</option>
                  {mpaRating.map(item => (
                    <option value={item.id} key={item.id}>{item.mpaRating}</option>
                  ))}
                </select>
              )}
              <Button
  variant="contained"
  size="large"
  onClick={handleGenerateWithFilters}
  sx={{ marginTop: '10px', marginLeft: '10px' }}
>
  Generate
</Button>

            </div>
          )}
        </div>
      )}

      {randomMovie && (
        <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '20px' }}>
          <CardMedia
            component="img"
            alt={randomMovie.name}
            height={400}
            image={randomMovie.image}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Random Movie:
            </Typography>
            <Typography variant="body1" component="div">
              <Link to={`/Movies/RandomMovieDetails/${randomMovie.id}`}>Movie title: {randomMovie.name}</Link>
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}