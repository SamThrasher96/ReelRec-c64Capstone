import { Outlet, Routes, Route } from "react-router-dom"
import { UserProfile } from "../User/UserProfile"
import { NewMovieForm } from "../Movies/NewMovieForm"
import { MovieList } from "../Movies/MovieList"

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
				<Route path="User" element={ <UserProfile />} />
				<Route path="Movies" element={ <NewMovieForm />} />
				<Route path="Movies/list" element={ < MovieList />} />
				
			</Route>
		</Routes>
	)
}

