import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./movie.css"


export const MovieList =({ searchTermState }) => {
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const navigate = useNavigate()
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/movies?_expand=genre&_expand=mpaRating&_expand=streamingService`)
                .then(response => response.json())
                .then((movieArray) => {
                    setMovies(movieArray)
                    setFilteredMovies(movieArray)
                })
        },
    []
    )

    useEffect(
        () => {
            const searchedMovies = movies.filter(movie =>{
                return movie.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredMovies(searchedMovies)
        },
        [ searchTermState ]
    )


    return <>
    <>
    <button onClick={() => navigate("*")}>Home</button>
    </>
    <h2>List of movies</h2>
    <article className="movies">
        {
            filteredMovies.map(
                (movie) => {
                    return <section className="movie" key={`movie--${movie.id}`}>
                        <header>Movie title:{movie.name}</header>
                        <div>Genre: {movie.genre.genre}</div>
                        <div>This movie is rated {movie.mpaRating.mpaRating}</div>
                        <div>Streaming Service: {movie.streamingService.service}</div>
                        <div>{movie.description}</div>
                    </section>
                }
            )
        }
    </article>
    </>
}