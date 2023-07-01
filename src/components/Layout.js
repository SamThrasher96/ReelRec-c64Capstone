import { AppBar, Toolbar, Typography, Avatar, Box, Menu, MenuItem, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';


const theme = createTheme({
  palette: {
    primary: {
      main: "#EC6938",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: 64
        },
      },
    },
  },
});

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("reelRec_user");
  const localReelRecUser = localStorage.getItem("reelRec_user");
  const ReelRecUserObject = JSON.parse(localReelRecUser);
  const [menuAnchor, setMenuAnchor] = React.useState(null)

  return (
    <div>
      <ThemeProvider theme={theme}>
        {isLoggedIn && (
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6">ReelRec</Typography>
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
                <MenuItem component={Link} to="/User">User Profile</MenuItem>
                <MenuItem component={Link} to="/Movies">Add a movie</MenuItem>
                <MenuItem component={Link} to="Movies/MovieContainer">Movie List</MenuItem>
                <MenuItem component={Link} to="Movies/WatchList">Watch List</MenuItem>
                <MenuItem component={Link} to="Movies/FavoriteList">Favorites</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("reelRec_user");
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        )}
      </ThemeProvider>
      <div>{children}</div>
    </div>
  );
};