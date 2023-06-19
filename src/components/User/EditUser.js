import { useState } from "react"


export const EditUserProfile = () => {
    const [profile, updateProfile] = useState({
        name: "",
        email: ""
    })



const handleSaveButtonClick = () => {
    event.preventDefault()

}

return (
    <form className="user">
        <h2 className="user_title">Edit User Info</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="specialty">Name</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile.specialty}
                    onChange={
                        (evt) => {
                            // TODO: Update specialty property
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Hourly rate:</label>
                <input type="number"
                    className="form-control"
                    value={profile.rate}
                    onChange={
                        (evt) => {
                            // TODO: Update rate property
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={}
            className="btn btn-primary">
            Save Profile
        </button>
    </form>
)
}