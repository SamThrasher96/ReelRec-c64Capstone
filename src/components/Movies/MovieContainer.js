import { useState } from "react";
import { MovieList } from "./MovieList";
import { MovieSearch } from "./MovieSearch";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MovieContainer = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Typography variant="h3" align="center" style={{ marginTop: "20px" }}>
        List of Movies
      </Typography>

      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "20px" }}>
        <Grid item>
          <MovieSearch setterFunction={setSearchTerms} />
        </Grid>
      </Grid>

      <MovieList searchTermState={searchTerms} />
    </>
  );
};