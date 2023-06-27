import { useEffect, useState } from "react"
import "./movie.css"
import { Link } from "react-router-dom"

export const RandomMovieGenerator = () => {
    const [movies, setMovies] = useState([])
    const [randomMovie, setRandomMovie] = useState(null)
    const [filterCategory, setFilterCategory] = useState("")
    const [filterValue, setFilterValue] = useState("")
    const [movieGenre, setMovieGenre] = useState([])
    const [streamingService, setStreamingService] = useState([])
    const [mpaRating, setMpaRating] = useState([])

  const getMovies = () => {
    fetch("http://localhost:8088/movies?_expand=genre&_expand=mpaRating&_expand=streamingService")
      .then(response => response.json())
      .then((movieArray) => {
        setMovies(movieArray)
      })
  }

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(
    () => {
        fetch(`http://localhost:8088/genres`)
            .then(response => response.json())
            .then((genresArray) => {
                setMovieGenre(genresArray)
            })
    },
    []
)

useEffect(
    () => {
        fetch(`http://localhost:8088/streamingServices`)
            .then(response => response.json())
            .then((streamingServicesArray) => {
                setStreamingService(streamingServicesArray)
            })
    },
    []
)

useEffect(
    () => {
        fetch(`http://localhost:8088/mpaRatings`)
            .then(response => response.json())
            .then((mpaRatingArray) => {
                setMpaRating(mpaRatingArray)
            })
    },
    []
)

  const generateRandomMovie = () => {
    let filteredMovies = movies
    if (filterCategory && filterValue) {
        filteredMovies = movies.filter(movie => {
        if (filterCategory === "genre") {
          return movie.genreId == filterValue
        } else if (filterCategory === "streamingService") {
          return movie.streamingServiceId == filterValue
        } else if (filterCategory === "mpaRating") {
          return movie.mpaRatingId == filterValue
        }
      })
    }

    if (filteredMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMovies.length)
      const randomMovie = filteredMovies[randomIndex]
      setRandomMovie(randomMovie)
    } else {
      setRandomMovie(null)
    }
  }

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value)
    setFilterValue("")
  }

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <>
      <div>
        <button onClick={generateRandomMovie}>Generate Random Movie</button>
      </div>

      <div>
        <h2>Get a random movie</h2>
        <div>
          <label htmlFor="filterCategory">Filter Category:</label>
          <select id="filterCategory" value={filterCategory} onChange={handleFilterCategoryChange}>
            <option value="">Select Category</option>
            <option value="genre">Genre</option>
            <option value="streamingService">Streaming Service</option>
            <option value="mpaRating">MPA Rating</option>
          </select>
        </div>

        {filterCategory && (
          <div>
            <label htmlFor="filterValue">Filter Value:</label>
            {filterCategory === "genre" && (
              <select id="filterValue" value={filterValue} onChange={handleFilterValueChange}>
                <option value="">Select Genre</option>
                {movieGenre.map(item => (
                    <option value={item.id} key={item.id}>{item.genre}</option>
                ))}
              </select>
            )}
            {filterCategory === "streamingService" && (
              <select id="filterValue" value={filterValue} onChange={handleFilterValueChange}>
                <option value="" defaultValue>Select Streaming Service</option>
                {streamingService.map(item => (
                     <option value={item.id} key={item.id}>{item.service}</option>
                ))}
              </select>
            )}
            {filterCategory === "mpaRating" && (
              <select id="filterValue" value={filterValue} onChange={handleFilterValueChange}>
                <option value="" defaultValue>Select MPA Rating</option>
                {mpaRating.map(item => (
                    <option value={item.id} key={item.id}>{item.mpaRating}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {randomMovie && (
          <section className="movie">
            <header>Random Movie:</header>
            <div>
              <Link to={`/Movies/RandomMovieDetails/${randomMovie.id}`}>Movie title: {randomMovie.name}</Link>
            </div>
          </section>
        )}
      </div>
    </>
  )
}