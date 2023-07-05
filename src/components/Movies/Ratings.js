import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    CardActions,
    useTheme,
    Box,
} from "@mui/material";

export const MovieRatings = () => {
    const [movies, setMovies] = useState([]);
    const [ratingValue, setRatingValue] = useState();
    const localReelRecUser = localStorage.getItem("reelRec_user");
    const ReelRecUserObject = JSON.parse(localReelRecUser);

    useEffect(() => {
        const userId = ReelRecUserObject.id;

        const fetchUserRating = () => {
            fetch(`http://localhost:8088/users/${userId}`)
                .then((response) => response.json())
                .then((userData) => {
                    const userRating = userData.rating;
                    setRatingValue(userRating);
                });
        };

        const getMovies = () => {
            fetch(
                `http://localhost:8088/movies?_expand=genre&_expand=mpaRating&_expand=streamingService`
            )
                .then((response) => response.json())
                .then((movieArray) => {
                    const sortedMovies = movieArray.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setMovies(sortedMovies);
                });
        };
        getMovies();
    }, []);

    const addRatings = (movieId) => {
        const userId = ReelRecUserObject.id;
        const ratingObject = {
            movieId: movieId,
            userId: userId,
            rating: ratingValue,
        };
        console.log(ratingObject);

        fetch("http://localhost:8088/ratings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ratingObject),
        })
            .then((response) => response.json())
            .then(() => {
                console.log("Movie rated");
                fetch(`http://localhost:8088/users/${userId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ rating: ratingValue }),
                })
                    .then((response) => response.json())
                    .then(() => {
                        console.log("User rating updated");
                    });
            });
    };

    const handleRatingSubmit = (movieId) => {
        addRatings(movieId);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "auto",
                }}
            >
                <Rating
                    name="rating"
                    value={ratingValue !== undefined ? ratingValue : null}
                    onChange={(event, newValue) => {
                        setRatingValue(newValue);
                    }}
                >
                    <Typography>
                        Rated {ratingValue !== undefined ? ratingValue : 0} stars
                    </Typography>
                </Rating>
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleRatingSubmit(movies.id)}
            >
                Submit Rating
            </Button>
        </>
    );
};
