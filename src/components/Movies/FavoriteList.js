import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

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
            (item) =>
                item.userId === ReelRecUserObject.id && item.favorite === true
        );
        setUserFavoriteList(filterFavoriteList);
        console.log(filterFavoriteList);
        });
    }, 
    []
);

const removeFromFavorites = (favoriteId) => {
    fetch(`http://localhost:8088/userWatchListAndFavorites/${favoriteId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorite: false }),
    }).then(() => {
        const updatedFavorites = userFavoriteList.filter(
        (item) => item.id !== favoriteId
        );
        setUserFavoriteList(updatedFavorites);
        console.log("Movie removed from favorites");
    });
};

return (
    <>
        <h2>Favorite List</h2>
        <Button variant="contained" onClick={() => navigate("/")}>
        Home
    </Button>

    <div className="movies" style={{ display: "flex", flexWrap: "wrap" }}>
        {userFavoriteList.map((movie) => {
            return (
            <Card
                key={`userFavoriteList--${movie.id}`}
                sx={{ maxWidth: 345, margin: "10px" }}
            >
                <CardMedia
                component="img"
                height="140"
                image={movie.movie.image}
                alt={movie.movie.name}
                />
                <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                    {movie.movie.name}
                </Typography>
                <Typography variant="body2" align="center">
                    Description: {movie.movie.description}
                </Typography>
                </CardContent>
                <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => removeFromFavorites(movie.id)}
                style={{ marginBottom: "10px" }}
                >
                Remove from favorites
                </Button>
            </Card>
            );
        })}
        </div>
    </>
    );
};