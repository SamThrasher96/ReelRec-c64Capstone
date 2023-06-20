import { Outlet, Routes, Route, Navigate } from "react-router-dom"
import { UserProfile } from "../User/UserProfile"
import { NewMovieForm } from "../Movies/NewMovieForm"
import { MovieContainer } from "../Movies/MovieContainer"
import { EditUserProfile } from "../User/EditUser"
import { RandomMovieDetails } from "../Movies/RandomMovieDetails"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="*" element={
					<>
						<h1 className="title--main">ReelRec</h1>
						<div>What are we watching next?</div>
					<Outlet />
					</>
			}>
				<Route path="Movies" element={ <NewMovieForm />} />
				<Route path="Movies/MovieContainer" element={ < MovieContainer />} />
				<Route path="Movies/RandomMovieDetails/:movieId" element={ < RandomMovieDetails />} />
				<Route path="User/EditUser/:userId" element={ < EditUserProfile />} />
				<Route path="User" element={ <UserProfile />} />

			</Route>
		</Routes>
	)
}

