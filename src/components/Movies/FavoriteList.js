import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(1),
  flexGrow: 1,
}));

export const UserFavoriteList = () => {
  const [userFavoriteList, setUserFavoriteList] = useState([]);
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const ReelRecUserObject = JSON.parse(localReelRecUser);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/userWatchListAndFavorites?_expand=movie`)
      .then((response) => response.json())
      .then((favoriteListArray) => {
        const filterFavoriteList = favoriteListArray.filter(
          (item) => item.userId === ReelRecUserObject.id && item.favorite === true
        );
        setUserFavoriteList(filterFavoriteList);
      });
  }, []);

  const removeFromFavorites = (favoriteId) => {
    fetch(`http://localhost:8088/userWatchListAndFavorites/${favoriteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: false }),
    }).then(() => {
      const updatedFavorites = userFavoriteList.filter((item) => item.id !== favoriteId);
      setUserFavoriteList(updatedFavorites);
      console.log("Movie removed from favorites");
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" style={{ marginTop: "20px" }}>
        Favorites
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Home
      </Button>

      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {userFavoriteList.map((favoriteItem) => (
          <Grid item xs={12} sm={6} md={4} key={`favoriteItem--${favoriteItem.id}`}>
            <StyledCard>
              <CardMedia component="img" height="100%" image={favoriteItem.movie.image} alt={favoriteItem.movie.name} />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  {favoriteItem.movie.name}
                </Typography>
                <Typography variant="body2" align="center">
                {favoriteItem.movie.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => removeFromFavorites(favoriteItem.id)}
                style={{ marginBottom: "10px" }}
              >
                Remove from favorites
              </Button>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};