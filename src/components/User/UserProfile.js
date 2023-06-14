import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserProfile = () => {
  const { userId } = useParams();
  const [user, updateUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8088/users?id=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const singleUser = data[0];
        updateUser(singleUser);
      });
  }, [userId]);

  return (
    <section className="user">
      <header className="userHeader">Name: {user.name}</header>
      <div>Email: {user.email}</div>
    </section>
  );
};

