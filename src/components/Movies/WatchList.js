import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const UserWatchList = () => {
    const [userWatchList, setUserWatchList] = useState([])
    const navigate = useNavigate()
    const localReelRecUser = localStorage.getItem("reelRec_user")
    const ReelRecUserObject = JSON.parse(localReelRecUser)

    useEffect(() => {
        fetch(`http://localhost:8088/userWatchListAndFavorites?_expand=movie`)
            .then(response => response.json())
            .then((watchListArray) => {
                const filteredWatchList = watchListArray.filter(item => item.userId === ReelRecUserObject.id && item.watchList === true);
                setUserWatchList(filteredWatchList);
                console.log(filteredWatchList)
            })
    }, 
    []
);

const removeFromWatchList = (watchListId) => {
    fetch(`http://localhost:8088/userWatchListAndFavorites/${watchListId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({watchList: false}),
    }).then(() => {
        const updatedWatchList = userWatchList.filter(
            (item) => item.id !== watchListId
        );
        setUserWatchList(updatedWatchList);
        console.log("Movie removed from watch list")
    })
}

return <>
<h2>Watch List</h2>
<button onClick={() => navigate("/")}>Home</button>

<article className="movies">
    {
        userWatchList.map(
            (movie) => {
                return <section className="movie" key={`userWatchListMovies--${movie.id}`}>
                    <img src={movie.movie.image} alt={movie.movie.name} />
                    <header>{movie.movie.name}</header>
                    <footer>Description: {movie.movie.description}</footer>
                    <button onClick={() => removeFromWatchList(movie.id)}>
                Remove from Watch List
            </button>
                </section>
            }
        )
    }
</article>
</>


}