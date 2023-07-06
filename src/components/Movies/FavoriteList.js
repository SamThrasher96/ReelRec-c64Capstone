import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

export const UserFavoriteList = () => {
  const [userFavoriteList, setUserFavoriteList] = useState([]);
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const ReelRecUserObject = JSON.parse(localReelRecUser);

  useEffect(() => {
    fetch(`http://localhost:8088/userWatchListAndFavorites?_expand=movie`)
      .then((response) => response.json())
      .then((favoriteListArray) => {
        const filterFavoriteList = favoriteListArray.filter(
          (item) => item.userId === ReelRecUserObject.id && item.favorite === true
        );
        setUserFavoriteList(filterFavoriteList);
      });
  }, [ReelRecUserObject.id]);

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

      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {userFavoriteList.map((favoriteItem) => (
          <Grid item xs={12} sm={6} md={4} key={`favoriteItem--${favoriteItem.id}`}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", margin: "10px", position: "relative" }}>
              <CardMedia component="img" height="650" image={favoriteItem.movie.image} alt={favoriteItem.movie.name} />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {favoriteItem.movie.name}
                </Typography>
                <Typography variant="body2" align="center" style={{ marginBottom: "10px" }}>
                  {favoriteItem.movie.description}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => removeFromFavorites(favoriteItem.id)}
                  style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}
                >
                  Remove from favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};