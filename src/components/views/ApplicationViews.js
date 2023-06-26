import { Outlet, Routes, Route, useLocation } from "react-router-dom"
import { UserProfile } from "../User/UserProfile"
import { NewMovieForm } from "../Movies/NewMovieForm"
import { MovieContainer } from "../Movies/MovieContainer"
import { EditUserProfile } from "../User/EditUser"
import { RandomMovieDetails } from "../Movies/RandomMovieDetails"
import { RandomMovieGenerator } from "../Movies/RandomMovies"

const Home = () => {
  const location = useLocation()

  return (
    <>
      <h1 className="title--main">ReelRec</h1>
      <div>What are we watching next?</div>
      {location.pathname === "/" && <RandomMovieGenerator />}
      <Outlet />
    </>
  )
}

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Movies" element={<NewMovieForm />} />
      <Route path="Movies/MovieContainer" element={<MovieContainer />} />
      <Route path="Movies/RandomMovieDetails/:movieId" element={<RandomMovieDetails />} />
      <Route path="User/EditUser/:userId" element={<EditUserProfile />} />
      <Route path="User" element={<UserProfile />} />
    </Routes>
  )
}

