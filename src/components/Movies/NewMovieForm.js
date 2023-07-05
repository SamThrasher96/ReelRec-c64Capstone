import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const NewMovieForm = () => {
  const [movie, updateMovie] = useState({
    name: "",
    genreId: 0,
    streamingServiceId: 0,
    mpaRatingId: 0,
    description: "",
    image: "",
  });

  const navigate = useNavigate();
  const [movieGenre, setMovieGenre] = useState([]);
  const [streamingService, setStreamingService] = useState([]);
  const [mpaRating, setMpaRating] = useState([]);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    console.log("You clicked the button!!");

    const movieToSendToAPI = {
      name: movie.name,
      genreId: movie.genreId,
      streamingServiceId: movie.streamingServiceId,
      mpaRatingId: movie.mpaRatingId,
      description: movie.description,
      image: movie.image,
    };

    if (
      movie.name !== "" &&
      movie.genreId > 0 &&
      movie.streamingServiceId > 0 &&
      movie.mpaRatingId > 0 &&
      movie.description !== ""
    ) {
      return fetch("http://localhost:8088/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieToSendToAPI),
      })
        .then((response) => response.json())
        .then(() => {
          navigate("/");
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8088/genres")
      .then((response) => response.json())
      .then((genresArray) => {
        setMovieGenre(genresArray);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/streamingServices")
      .then((response) => response.json())
      .then((streamingServicesArray) => {
        setStreamingService(streamingServicesArray);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/mpaRatings")
      .then((response) => response.json())
      .then((mpaRatingArray) => {
        setMpaRating(mpaRatingArray);
      });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item>
      <Paper elevation={3} sx={{ padding: "2rem", width: "400px" }}>
          <Typography variant="h4" component="h2" align="center" marginBottom={"7px"}>
            New Movie
          </Typography>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel htmlFor="name" shrink={Boolean(movie.name)}>
                Name
              </InputLabel>
              <TextField
                required
                autoFocus
                type="text"
                id="name"
                value={movie.name}
                onChange={(event) => {
                  const copy = { ...movie };
                  copy.name = event.target.value;
                  updateMovie(copy);
                }}
              />
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel htmlFor="genreId" shrink={Boolean(movie.genreId)}>
                Genre
              </InputLabel>
              <Select
                required
                autoFocus
                id="genreId"
                value={movie.genreId}
                onChange={(event) => {
                  const copy = { ...movie };
                  copy.genreId = event.target.value;
                  updateMovie(copy);
                }}
              >
                <MenuItem value="" disabled>
                  Select a genre
                </MenuItem>
                {movieGenre.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="streaming-service"
                shrink={Boolean(movie.streamingServiceId)}
              >
                Streaming service
              </InputLabel>
              <Select
                required
                autoFocus
                id="streaming-service"
                value={movie.streamingServiceId}
                onChange={(event) => {
                  const copy = { ...movie };
                  copy.streamingServiceId = event.target.value;
                  updateMovie(copy);
                }}
              >
                <MenuItem value="" disabled>
                  Select a streaming service
                </MenuItem>
                {streamingService.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.service}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="mpa-rating"
                shrink={Boolean(movie.mpaRatingId)}
              >
                MPA Rating
              </InputLabel>
              <Select
                required
                autoFocus
                id="mpa-rating"
                value={movie.mpaRatingId}
                onChange={(event) => {
                  const copy = { ...movie };
                  copy.mpaRatingId = event.target.value;
                  updateMovie(copy);
                }}
              >
                <MenuItem value="" disabled>
                  Select a rating
                </MenuItem>
                {mpaRating.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.mpaRating}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="description"
                shrink={Boolean(movie.description)}
              >
                Description
              </InputLabel>
              <TextField
                required
                autoFocus
                multiline
                rows={4}
                id="description"
                value={movie.description}
                onChange={(event) => {
                  const copy = { ...movie };
                  copy.description = event.target.value;
                  updateMovie(copy);
                }}
              />
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel htmlFor="image" shrink={Boolean(movie.image)}>
              Enter a link to the movie cover here
              </InputLabel>
              <TextField
                required
                autoFocus
                type="text"
                id="image"
                value={movie.image}
                onChange={(event) => {
                  const copy = { ...movie };
                  copy.image = event.target.value;
                  updateMovie(copy);
                }}
              />
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <Button
              onClick={handleSaveButtonClick}
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit form
            </Button>
          </FormContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

