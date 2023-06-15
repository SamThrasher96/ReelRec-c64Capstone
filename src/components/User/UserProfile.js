export const UserProfile = () => {
    const localReelRecUser = localStorage.getItem("reelRec_user")
    const reelRecUserObject = JSON.parse(localReelRecUser)

    

    return <section className="user">
        <header className="userHeader">Name: {reelRecUserObject.name} </header>
        <div>Email: {reelRecUserObject.email}</div>
    </section>
}
