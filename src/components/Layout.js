import { AppBar, Toolbar, Typography, Stack } from "@mui/material";
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

  return (
    <div>
      <ThemeProvider theme={theme}>
        {isLoggedIn && (
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6">ReelRec</Typography>
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
              </Stack>
            </Toolbar>
          </AppBar>
        )}
      </ThemeProvider>
      <div>{children}</div>
    </div>
  );
};