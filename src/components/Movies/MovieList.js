import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const MovieList =({}) => {
    const [movies, setMovies] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(``)
                .then(response => response.json())
                .then((movieArray) => {
                    setMovies(movieArray)
                })
            console.log("Initial state of tickets", tickets)
        }
    )

    return <>
    <h2>List of movies</h2>
    <article className="movies">
        {
            setMovies.map(
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