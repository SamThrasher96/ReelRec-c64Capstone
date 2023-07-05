import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Grid, Container } from "@mui/material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "reelRec_user",
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              profilePic: user.profilePic,
            })
          );
          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <Container style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <form style={{ width: "100%", maxWidth: "400px", padding: "16px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", borderRadius: "4px", backgroundColor: "#ffffff" }} onSubmit={handleLogin}>
            <img src="./images/ReelRecLogo.png" alt="ReelRec Logo" className="logo-image" />
            <Typography variant="h5" component="h1" style={{ marginBottom: "16px" }}>
              ReelRec
            </Typography>
            <TextField
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              label="Email address"
              color="primary"
              variant="outlined"
              fullWidth
              required
              autoFocus
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
            >
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

