import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const EditUserProfile = () => {
  const { userId } = useParams();
  const [profile, updateProfile] = useState({
    name: "",
    email: "",
    profilePic: "",
  });
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/users?id=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const userObject = data[0];
        updateProfile(userObject);
      });
  }, [userId]);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8088/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => response.json())
      .then(() => {
        setShowAlert(true); 
        setTimeout(() => {
          setShowAlert(false); 
          navigate("/User");
        }, 1000);
        const localReelRecUser = localStorage.getItem("reelRec_user");
        const ReelRecUserObject = JSON.parse(localReelRecUser);
        ReelRecUserObject.profilePic = profile.profilePic;
        localStorage.setItem("reelRec_user", JSON.stringify(ReelRecUserObject));
      });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "70vh" }}
    >
      <Grid item>
        <Paper elevation={3} sx={{ padding: "2rem", width: "400px" }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            marginBottom={"15px"}
          >
            Edit User Info
          </Typography>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel htmlFor="name" shrink>
                Name
              </InputLabel>
              <TextField
                required
                autoFocus
                type="text"
                id="name"
                value={profile.name}
                onChange={(evt) => {
                  const copy = { ...profile };
                  copy.name = evt.target.value;
                  updateProfile(copy);
                }}
              />
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel htmlFor="email" shrink>
                Email
              </InputLabel>
              <TextField
                required
                type="text"
                id="email"
                value={profile.email}
                onChange={(evt) => {
                  const copy = { ...profile };
                  copy.email = evt.target.value;
                  updateProfile(copy);
                }}
              />
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <FormControl fullWidth>
              <InputLabel htmlFor="profilePic" shrink>
                Profile Pic
              </InputLabel>
              <TextField
                required
                autoFocus
                type="text"
                id="profilePic"
                value={profile.profilePic}
                onChange={(evt) => {
                  const copy = { ...profile };
                  copy.profilePic = evt.target.value;
                  updateProfile(copy);
                }}
              />
            </FormControl>
          </FormContainer>
          <FormContainer item>
            <Button
              onClick={handleSaveButtonClick}
              variant="contained"
              color="primary"
              fullWidth
            >
              Save Profile
            </Button>
          </FormContainer>
          {showAlert && (
            <Alert severity="success" sx={{ marginTop: "1rem" }}>
              Your profile has been updated.
            </Alert>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

