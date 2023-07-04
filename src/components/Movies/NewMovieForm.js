import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



export const NewMovieForm = () => {
    const [movie, updateMovie] = useState({
        name: "",
        genreId: 0,
        streamingServiceId: 0,
        mpaRatingId: 0,
        description: "",
        image: ""
    });

const navigate = useNavigate();
const [movieGenre, setMovieGenre] = useState([])
const [streamingService, setStreamingService] = useState([])
const [mpaRating, setMpaRating] = useState([])

const handleSaveButtonClick = (event) => {
    event.preventDefault();
    console.log("You clicked the button!!")

    const movieToSendToAPI = {
        name: movie.name,
        genreId: movie.genreId,
        streamingServiceId: movie.streamingServiceId,
        mpaRatingId: movie.mpaRatingId,
        description: movie.description,
        image: movie.image
    }

    if (movie.name !== "" && movie.genreId > 0 && movie.streamingServiceId >0 && movie.mpaRatingId >0 && movie.description !== "" ) {
    return fetch (`http://localhost:8088/movies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieToSendToAPI),
    })
        .then((response) => response.json())
        .then(() => {
            navigate("/");
        })
}
};

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

return (
    <form className="newMovieForm">
    <h2 className="movieForm_title">New Movie Addition</h2>
    <fieldset>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="New movie name"
            value={movie.name}
            onChange={(event) => {
                const copy = {...movie};
                copy.name = event.target.value;
                updateMovie(copy);
            }}
            />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <select
            required autoFocus
            className="form-control"
            placeholder="Genre"
            value={movie.genreId}
            onChange={(event) => {
                const copy = {...movie};
                copy.genreId = event.target.value;
                updateMovie(copy);
            }}
            >
                <option value="" defaultValue>Select a genre</option>
                {movieGenre.map(item => (
                    <option value={item.id} key={item.id}>{item.genre}</option>
                ))}
            </select>
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="streaming-service">Streaming service</label>
            <select 
            required autoFocus
            className="form-control"
            placeholder="Streaming Service"
            value={movie.streamingServiceId}
            onChange={(event) => {
                const copy = {...movie};
                copy.streamingServiceId = event.target.value;
                updateMovie(copy);
            }}
            >
                <option value="" defaultValue>Select a streaming service</option>
                {streamingService.map(item => (
                    <option value={item.id} key={item.id}>{item.service}</option>
                ))}
            </select>
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="mpa-rating">MPA Rating</label>
            <select 
            required autoFocus
            className="form-control"
            placeholder="MPA Rating"
            value={movie.mpaRatingId}
            onChange={(event) => {
                const copy = {...movie};
                copy.mpaRatingId = event.target.value;
                updateMovie(copy);
            }}
            >
                <option value="" defaultValue>Select a rating</option>
                {mpaRating.map(item => (
                    <option value={item.id} key={item.id}>{item.mpaRating}</option>
                ))}
            </select>
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="description">description</label>
            <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="enter a brief description of the movie"
            value={movie.description}
            onChange={(event) => {
                const copy = {...movie};
                copy.description = event.target.value;
                updateMovie(copy);
            }}
            />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="description">Movie Cover</label>
            <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="enter a link to the movie cover here"
            value={movie.image}
            onChange={(event) => {
                const copy = {...movie};
                copy.image = event.target.value;
                updateMovie(copy);
            }}
            />
        </div>
    </fieldset>
    
    <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
        >Submit form</button>
    </form>
    )
}