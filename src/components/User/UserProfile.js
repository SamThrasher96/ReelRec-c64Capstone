import { useNavigate } from "react-router-dom";
import "./User.css";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const [users, setUser] = useState([]);
  const navigate = useNavigate();
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const reelRecUserObject = JSON.parse(localReelRecUser);

  useEffect(() => {
    fetch(`http://localhost:8088/users?id=${reelRecUserObject.id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  return (
    <>
      <button onClick={() => navigate("/")}>Home</button>
      <section className="user">
        {users.map((user) => {
          return (
            <div key={`user-${user.id}`}>
              <h2>User Profile</h2>
              <img src={user.profilePic} alt={user.name} />
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <button onClick={() => navigate(`/User/EditUser/${user.id}`)}>
                Edit profile
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
};



