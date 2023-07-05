import React, { useState } from "react";
import { Home as HomeIcon } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("reelRec_user");
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const ReelRecUserObject = JSON.parse(localReelRecUser);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    theme.palette.mode = darkMode ? "light" : "dark";
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#EC6938",
        dark: "#808071",
      },
      secondary: {
        main: "#FFFFE2",
        dark: "#FF0000",
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h1: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      h2: {
        fontSize: "1.8rem",
        fontWeight: 500,
      },
    },
  });

  return (
    <div>
      {isLoggedIn && (
        <AppBar position="static" color="primary">
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Toolbar>
              <IconButton
                component={Link}
                to="/"
                color="inherit"
                edge="start"
                aria-label="home"
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ReelRec
              </Typography>
              <Box flexGrow={1} />
              <IconButton
                color="inherit"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                <Avatar alt="Profile" src={ReelRecUserObject.profilePic} />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
              >
                <MenuItem component={Link} to="/User">
                  User Profile
                </MenuItem>
                <MenuItem component={Link} to="/Movies">
                  Add a movie
                </MenuItem>
                <MenuItem component={Link} to="Movies/MovieContainer">
                  Movie List
                </MenuItem>
                <MenuItem component={Link} to="Movies/WatchList">
                  Watch List
                </MenuItem>
                <MenuItem component={Link} to="Movies/FavoriteList">
                  Favorites
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("reelRec_user");
                    navigate("/", { replace: true });
                    setMenuAnchor(null);
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
              </IconButton>
            </Toolbar>
        </ThemeProvider>
        </AppBar>
      )}
      <div>{children}</div>
    </div>
  );
};
