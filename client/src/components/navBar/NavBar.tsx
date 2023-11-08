import { useNavigate } from "react-router-dom"
import { getRoutes } from "./navBarHooks"

export const NavBar = () => {
  const navigate = useNavigate();
  const routes = getRoutes();

  const isActive = (to: string) => {
    if (to === "/" && location.pathname === "/") {
      return true
    }
    if (to !== "/" && location.pathname.includes(to)) {
      return true
    }
  }

  return (
    <nav className="bg-primary shadow">
      <div className="row vw-100">
        {routes.map((r) => (
          <div className="col-auto px-1 my-auto"
            key={r.to}>
            <button className={`btn btn-primary ${isActive(r.to) && "active"}`}
              onClick={() => navigate(r.to)}>
              <div>{r.text}</div>
            </button>
          </div>
        ))}
      </div>
    </nav>
  )
}
