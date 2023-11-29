import { Route, Routes } from "react-router-dom"
import { Chores } from "./pages/chores/Chores"
import { Prizes } from "./pages/prizes/Prizes"
import { NavBar } from "./components/navBar/NavBar"
import { Parents } from "./pages/parents/Parents"
import { Home } from "./pages/home/Home"
import { Toaster } from "react-hot-toast"
import ChildProvider from "./context/childContext"
import { FloatingSquares } from "./components/ui/FloatingSquares"
import { PrizeHistory } from "./pages/prizes/history/PrizeHistory"

function App() {

  return (
    <>
      <Toaster />
      <FloatingSquares />
      <div className="d-flex flex-column nav-flex">
        <ChildProvider>
          <NavBar />
          <div className="overflow-auto flex-grow-1 justify-content-between">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prizes" element={<Prizes />} />
              <Route path="/prizes/history" element={<PrizeHistory />} />
              <Route path="/chores" element={<Chores />} />
              <Route path="/parent" element={<Parents />} />
            </Routes>
          </div>
        </ChildProvider>
      </div>
    </>
  )
}

export default App
