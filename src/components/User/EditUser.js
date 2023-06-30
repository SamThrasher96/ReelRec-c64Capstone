import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



export const EditUserProfile = () => {
    const {userId} = useParams()
    const [profile, updateProfile] = useState({
        name: "",
        email: "",
        profilePic: ""
    })
    const navigate = useNavigate()


useEffect(() => {
    fetch (`http://localhost:8088/users?id=${userId}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            updateProfile(userObject)
        })
    },
    [userId]
)

const handleSaveButtonClick = (event) => {
    event.preventDefault()

    return fetch(`http://localhost:8088/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/User")
        },
    []
    )


}

return (
    <form className="user">
        <h2 className="user_title">Edit User Info</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile.name}
                    onChange={
                        (evt) => {
                            const copy = {...profile}
                            copy.name = evt.target.value
                            updateProfile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text"
                    className="form-control"
                    value={profile.email}
                    onChange={
                        (evt) => {
                                const copy = {...profile}
                                copy.email = evt.target.value
                                updateProfile(copy)
                            }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Profile Pic:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile.profilePic}
                    onChange={
                        (evt) => {
                            const copy = {...profile}
                            copy.profilePic = evt.target.value
                            updateProfile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => { handleSaveButtonClick(clickEvent);
                window.alert("Your profile has been updated");
                }}
            className="btn btn-primary">
            Save Profile
        </button>
    </form>
)
}
