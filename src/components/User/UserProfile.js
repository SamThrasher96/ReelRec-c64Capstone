import { useNavigate } from "react-router-dom"
import "./User.css"

export const UserProfile = () => {
    const localReelRecUser = localStorage.getItem("reelRec_user")
    const reelRecUserObject = JSON.parse(localReelRecUser)
    const navigate = useNavigate()

    

    
    return <>
    <button onClick={() => navigate("*")}>Home</button> 
    <section className="user">
        <header className="userHeader">Name: {reelRecUserObject.name} </header>
        <div>Email: {reelRecUserObject.email}</div>
    </section>
    </>
}
