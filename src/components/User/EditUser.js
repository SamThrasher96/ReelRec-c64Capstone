import { useEffect, useState } from "react"


export const EditUserProfile = () => {
    const [profile, updateProfile] = useState({
        name: "",
        email: ""
    })

    const localReelRecUser = localStorage.getItem("reelRec_user")
    const reelRecUserObject = JSON.parse(localReelRecUser)

useEffect(() => {
    return fetch (`http://localhost:8088/users?id=${reelRecUserObject.id}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            updateProfile(userObject)
        })
    },
    []
)

const handleSaveButtonClick = (event) => {
    event.preventDefault()

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
                            // TODO: Update specialty property
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
                            // TODO: Update rate property
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Profile
        </button>
    </form>
)
}