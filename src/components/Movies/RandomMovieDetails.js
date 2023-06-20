import { useState } from "react"
import { useParams } from "react-router-dom"

export const RandomMovieDetails = () => {
    const {movieId} = useParams()
    const [randomlySelectedMovie, updateRandomlySelectedMovie] = useState()
    return <></>
}