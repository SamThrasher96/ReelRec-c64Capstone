import { useState } from "react"
import { MovieList } from "./MovieList"
import { MovieSearch } from "./MovieSearch"


export const MovieContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    <MovieSearch setterFunction={setSearchTerms} />
    <MovieList searchTermState={searchTerms} />
    </>
}