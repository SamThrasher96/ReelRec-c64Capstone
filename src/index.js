import { ReelRec } from "./components/ReelRec"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Layout } from "./components/Layout"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Layout>
        <ReelRec />
        </Layout>
    </BrowserRouter>
)

