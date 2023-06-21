import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./movie.css"


export const MovieList =({ searchTermState }) => {
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [randomMovie, setRandomMovie] = useState([])
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

    const generateRandomMovie = () => {
        const randomIndex = Math.floor(Math.random() * filteredMovies.length);
        const randomMovie = filteredMovies[randomIndex];
        setRandomMovie(randomMovie);
    };

    const deleteButton = () => {
        return <button onClick={() => {}} className="delete_movie">Delete Movie</button>
    }


    return <>
    <>
    <button onClick={() => navigate("*")}>Home</button>
    <button onClick={generateRandomMovie}>Generate Random Movie</button>

    </>
    <h2>List of movies</h2>
    {randomMovie && (
    <section className="movie">
        <header>Random Movie:</header>
        <div>
            <Link to={`/Movies/RandomMovieDetails/${randomMovie.id}`}>Movie title: {randomMovie.name} </Link>
        </div>
    </section>
)}
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
                        {
                            deleteButton()
                        }
                    </section>
                }
            )
        }
    </article>
    </>
}

