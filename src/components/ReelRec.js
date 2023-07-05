import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./ReelRec.css";


export const ReelRec = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <Authorized>
              <>
                <ApplicationViews />
              </>
            </Authorized>
          }
        />
      </Routes>
  );
};
