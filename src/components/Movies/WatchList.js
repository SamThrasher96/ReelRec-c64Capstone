import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Button, Grid, Typography, CardActions } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const UserWatchList = () => {
  const [userWatchList, setUserWatchList] = useState([]);
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const ReelRecUserObject = JSON.parse(localReelRecUser);

  useEffect(() => {
    fetch(`http://localhost:8088/userWatchListAndFavorites?_expand=movie`)
      .then((response) => response.json())
      .then((watchListArray) => {
        const filteredWatchList = watchListArray.filter(
          (item) => item.userId === ReelRecUserObject.id && item.watchList === true
        );
        setUserWatchList(filteredWatchList);
      });
  }, []);

  const removeFromWatchList = (watchListId) => {
    fetch(`http://localhost:8088/userWatchListAndFavorites/${watchListId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watchList: false }),
    }).then(() => {
      const updatedWatchList = userWatchList.filter((item) => item.id !== watchListId);
      setUserWatchList(updatedWatchList);
      console.log("Movie removed from watch list");
    });
  };

  return (
    <>
      <Typography variant="h3" align="center" style={{ marginTop: "20px" }}>
        Watch List
      </Typography>

      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {userWatchList.map((watchListItem) => (
          <Grid item xs={12} sm={6} md={4} key={`watchListItem--${watchListItem.id}`}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", margin: "10px" }}>
              <CardMedia component="img" height="650" image={watchListItem.movie.image} alt={watchListItem.movie.name} />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  {watchListItem.movie.name}
                </Typography>
                <Typography variant="body2" align="center">
                  {watchListItem.movie.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => removeFromWatchList(watchListItem.id)}
                >
                  Remove from Watch List
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};