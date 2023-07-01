import { AppBar, Toolbar, Typography, Stack, Avatar, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";


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
          height: 64, // Adjust the height as needed
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        {isLoggedIn && (
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6">ReelRec</Typography>
              <Box flexGrow={1} />
              <Stack direction="row" spacing={2} alignItems="center">
                <Link className="navbar__link" to="/User">
                  User Profile
                </Link>
                <Link className="navbar__link" to="/Movies">
                  Add a movie
                </Link>
                <Link className="navbar__link" to="Movies/MovieContainer">
                  Movie List
                </Link>
                <Link className="navbar__link" to="Movies/WatchList">
                  Watch List
                </Link>
                <Link className="navbar__link" to="Movies/FavoriteList">
                  Favorites
                </Link>
                <Link
                  className="navbar__link navbar__logout"
                  to=""
                  onClick={() => {
                    localStorage.removeItem("reelRec_user");
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </Link>
                {isLoggedIn && (
    <Avatar
      alt="Profile"
      src={ReelRecUserObject.profilePic} 
    />
  )}
              </Stack>
            </Toolbar>
          </AppBar>
        )}
      </ThemeProvider>
      <div>{children}</div>
    </div>
  );
};