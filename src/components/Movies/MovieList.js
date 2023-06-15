import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Movie.css"


export const MovieList =({}) => {
    const [movies, setMovies] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/movies`)
                .then(response => response.json())
                .then((movieArray) => {
                    setMovies(movieArray)
                })
        }
    )

    return <>
    <button onClick={() => navigate("*")}>Home</button>
    <h2>List of movies</h2>
    <article className="movies">
        {
            movies.map(
                (movie) => {
                    return <section className="movie" key={`movie--${movie.id}`}>
                        <header>Movie title:{movie.name}</header>
                        <div>Genre: {movie.genreId}</div>
                        <div>This movie is rated {movie.mpaRatingId}</div>
                        <div>Streaming Service: {movie.streamingServiceId}</div>
                        <div>{movie.description}</div>
                    </section>
                }
            )
        }
    </article>
    </>
}