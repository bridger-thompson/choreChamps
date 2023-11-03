import { Route, Routes } from "react-router-dom"
import { Chores } from "./pages/chores/Chores"
import { Prizes } from "./pages/prizes/Prizes"
import { NavBar } from "./components/navBar/NavBar"

function App() {

  return (
    <div className="d-flex flex-column nav-flex">
      <NavBar />
      <div className="overflow-auto flex-grow-1 justify-content-between">
        <Routes>
          <Route path="/" element={<Chores />} />
          <Route path="/prizes" element={<Prizes />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
