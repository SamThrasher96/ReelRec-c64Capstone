import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./Login.css";

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
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>ReelRec</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <TextField
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              label="Email address"
              color="primary"
              variant="outlined"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <Button variant="contained" type="submit" color="success">
              Sign in
            </Button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a user yet?</Link>
      </section>
    </main>
  );
};

