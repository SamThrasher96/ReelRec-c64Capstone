import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./ReelRec.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC6938"
    },
    secondary: {
      main: "#FFFFE2"
    },
	third:{
		main: "#808071"
	},
	fourth:{
		main: "#000000"
	},
	fifth:{
		main: "#FF0000"
	}
  },
});

export const ReelRec = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <Authorized>
              <>
                <NavBar />
                <ApplicationViews />
              </>
            </Authorized>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};
