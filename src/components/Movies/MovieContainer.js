import { useState } from "react";
import { MovieList } from "./MovieList";
import { MovieSearch } from "./MovieSearch";
import { Grid, Typography } from "@mui/material";

export const MovieContainer = () => {
  const [searchTerms, setSearchTerms] = useState("");

  return (
    <>
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