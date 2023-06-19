import { useNavigate } from "react-router-dom"
import "./User.css"

export const UserProfile = () => {
    const localReelRecUser = localStorage.getItem("reelRec_user")
    const reelRecUserObject = JSON.parse(localReelRecUser)
    const navigate = useNavigate()

    

    
    return <>
    <button onClick={() => navigate("*")}>Home</button>
    <h1 className="title--main">ReelRec</h1>
    <section className="user">
        <header className="userHeader">Name: {reelRecUserObject.name} </header>
        <div>Email: {reelRecUserObject.email}</div>
    </section>
    <button onClick={() => navigate("User/EditUser")}>Edit profile</button>
    </>
}
