import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";


export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    profilePic: ""
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "reelRec_user",
            JSON.stringify({
              id: createdUser.id
            })
          );

          navigate("/login");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          window.alert("Account with that email address already exists");
        } else {
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  const handleHome = () => {
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: theme.palette.primary.main, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card variant="outlined" style={{ width: "600px", padding: "16px", border: "3px solid black" }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Please Register for ReelRec
          </Typography>
          <form className="form--login" onSubmit={handleRegister}>
            <TextField
              onChange={updateUser}
              type="text"
              id="name"
              label="Name"
              placeholder="Enter your name"
              required
              autoFocus
              fullWidth
              margin="normal"
            />
            <TextField
              onChange={updateUser}
              type="email"
              id="email"
              label="Email address"
              placeholder="Email address"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              onChange={updateUser}
              type="text"
              id="profilePic"
              label="Profile Picture"
              placeholder="Enter a link to your profile picture"
              required
              fullWidth
              margin="normal"
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: "8px" }}>
                Register
              </Button>
              <Button onClick={handleHome} type="button" variant="contained" color="primary">
                Home
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
