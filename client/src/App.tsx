import { Route, Routes } from "react-router-dom"
import { Chores } from "./pages/chores/Chores"
import { Prizes } from "./pages/prizes/Prizes"
import { NavBar } from "./components/navBar/NavBar"
import { Parents } from "./pages/parents/Parents"
import { Home } from "./pages/home/Home"
import { Toaster } from "react-hot-toast"
import ChildProvider from "./context/childContext"

function App() {

  return (
    <>
      <Toaster />
      <div className="d-flex flex-column nav-flex">
        <NavBar />
        <div className="overflow-auto flex-grow-1 justify-content-between">
          <ChildProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prizes" element={<Prizes />} />
              <Route path="/chores" element={<Chores />} />
              <Route path="/parent" element={<Parents />} />
            </Routes>
          </ChildProvider>
        </div>
      </div>
    </>
  )
}

export default App
