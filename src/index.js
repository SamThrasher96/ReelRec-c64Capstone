import { ReelRec } from "./components/ReelRec";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC6938",
      dark: "#FF0000",
    },
    secondary: {
      main: "#FFFFE2",
      dark: "#808071",
    },
    mode: "light",
  },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Layout>
        <ReelRec />
      </Layout>
    </BrowserRouter>
  </ThemeProvider>
);

