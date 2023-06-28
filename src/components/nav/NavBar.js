import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/User">User Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Movies">Add a movie</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="Movies/MovieContainer">Movie List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="Movies/WatchList">Watch List</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="Movies/FavoriteList">Favorites</Link>
            </li>
            {
                localStorage.getItem("reelRec_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("reelRec_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

