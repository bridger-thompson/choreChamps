import { useNavigate } from "react-router-dom"
import { getRoutes } from "./navBarHooks"
import { ThemeSelector } from "./ThemeSelector";
import { useContext } from "react";
import { ChildContext } from "../../context/childContext";
import { useGetChildsPointsQuery } from "../../hooks/peopleHooks";

export const NavBar = () => {
  const { selectedChildId } = useContext(ChildContext);
  const pointsQuery = useGetChildsPointsQuery(selectedChildId);
  const points = pointsQuery.data;
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
  console.log(window.location.pathname)

  return (
    <nav className="bg-primary shadow">
      <div className="row mx-0">
        {routes.map((r) => (
          <div className="col-auto pe-0 my-auto"
            key={r.to}>
            <button className={`btn btn-primary ${isActive(r.to) && "active"}`}
              onClick={() => navigate(r.to)}>
              <div><i className={r.icon + " me-1 fs-5"} />{r.text}</div>
            </button>
          </div>
        ))}
        <div className="text-end col my-auto">
          {(window.location.pathname.includes("prizes") || window.location.pathname.includes("chores")) && (
            <div className="fw-bold fs-4">
              Your Points: {points ?? "N/A"}
            </div>
          )}
        </div>
        <div className="col-auto">
          <ThemeSelector />
        </div>
      </div>
    </nav>
  )
}
