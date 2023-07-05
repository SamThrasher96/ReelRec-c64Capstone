import { Outlet, Routes, Route, useLocation } from "react-router-dom"
import { UserProfile } from "../User/UserProfile"
import { NewMovieForm } from "../Movies/NewMovieForm"
import { MovieContainer } from "../Movies/MovieContainer"
import { EditUserProfile } from "../User/EditUser"
import { RandomMovieDetails } from "../Movies/RandomMovieDetails"
import { RandomMovieGenerator } from "../Movies/RandomMovies"
import { Typography } from "@mui/material"
import { UserWatchList } from "../Movies/WatchList"
import { UserFavoriteList } from "../Movies/FavoriteList"
import "./ApplicationViews.css"

const Home = () => {
  const location = useLocation()

  return (
    <div className="home-container">
      <img
        src="./images/ReelRecLogo.png"
        alt="ReelRec Logo"
        className="logo-image"
      />
      <Typography variant="h5" align="center" gutterBottom>
        What are we watching next?
      </Typography>
      {location.pathname === "/" && <RandomMovieGenerator />}
      <Outlet />
    </div>
  );
};


export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Movies" element={<NewMovieForm />} />
      <Route path="Movies/MovieContainer" element={<MovieContainer />} />
      <Route path="Movies/RandomMovieDetails/:movieId" element={<RandomMovieDetails />} />
      <Route path="User/EditUser/:userId" element={<EditUserProfile />} />
      <Route path="Movies/WatchList" element={<UserWatchList />} />
      <Route path="Movies/FavoriteList" element={<UserFavoriteList />} />
      <Route path="User" element={<UserProfile />} />
    </Routes>
  )
}

