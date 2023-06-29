import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <button onClick={() => navigate("/")}>Home</button>

        <article className="movies">
        {userFavoriteList.map((movie) => {
            return (
            <section className="movie" key={`userFavoriteList--${movie.id}`}>
                <img src={movie.movie.image} alt={movie.movie.name} />
                <header>{movie.movie.name}</header>
                <footer>Description: {movie.movie.description}</footer>
                <button onClick={() => removeFromFavorites(movie.id)}>
                Remove from favorites
            </button>
            </section>
        );
        })}
    </article>
    </>
);
};
