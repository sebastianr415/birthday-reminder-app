import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import './styles.css'
import Board from "./app.jsx"

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Board />
  </StrictMode>
)