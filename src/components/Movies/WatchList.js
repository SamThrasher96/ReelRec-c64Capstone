import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const UserWatchList = () => {
    const [userWatchList, setUserWatchList] = useState([])
    const navigate = useNavigate()
    const localReelRecUser = localStorage.getItem("reelRec_user")
    const ReelRecUserObject = JSON.parse(localReelRecUser)

    useEffect(() => {
        fetch(`http://localhost:8088/userWatchLists?_expand=movie`)
            .then(response => response.json())
            .then((watchListArray) => {
                const filteredWatchList = watchListArray.filter(item => item.userId === ReelRecUserObject.id);
                setUserWatchList(filteredWatchList);
                console.log(filteredWatchList)
            })
    }, 
    []
);

return <>
<h2>Watch List</h2>

<article className="movies">
    {
        userWatchList.map(
            (movie) => {
                return <section className="movie" key={`userWatchListMovies--${movie.id}`}>
                    <header>{movie.movie.name}</header>
                    <footer>Description: {movie.movie.description}</footer>
                </section>
            }
        )
    }
</article>
</>


}