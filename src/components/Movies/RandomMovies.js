import { useEffect, useState } from "react"
import "./movie.css"
import { Link } from "react-router-dom"


export const RandomMovieGenerator = () => {
    const [movies, setMovies] = useState([])
    const [randomMovie, setRandomMovie] = useState([])


    const getMovies = () => {
        fetch(`http://localhost:8088/movies?_expand=genre&_expand=mpaRating&_expand=streamingService`)
        .then(response => response.json())
        .then((movieArray) => {
            setMovies(movieArray)
        })
    }
    
    useEffect(
        () => {
            getMovies()
        },
    []
    )

    const generateRandomMovie = () => {
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        setRandomMovie(randomMovie);
    };

    return <>
    <>
    <button onClick={generateRandomMovie}>Generate Random Movie</button>
    </>

    <h2>Get a random movie</h2>
    {randomMovie && (
    <section className="movie">
        <header>Random Movie:</header>
        <div>
            <Link to={`/Movies/RandomMovieDetails/${randomMovie.id}`}>Movie title: {randomMovie.name} </Link>
        </div>
    </section>
)}
    </>
}