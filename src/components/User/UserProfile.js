import { useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, Button } from "@mui/material";
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
      <section className="user">
        {users.map((user) => {
          return (
            <div key={`user-${user.id}`} style={{ marginTop: "150px", display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "20px",
                  width: "400px", // Adjust the width as desired
                }}
              >
                <CardContent>
                  <Typography variant="h2" component="h2" align="center">
                    User Profile
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                    <img src={user.profilePic} alt={user.name} style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                  </div>
                  <Typography variant="body1" align="center" gutterBottom>
                    Name: {user.name}
                  </Typography>
                  <Typography variant="body1" align="center" gutterBottom>
                    Email: {user.email}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/User/EditUser/${user.id}`)} fullWidth>
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </section>
    </>
  );
};



