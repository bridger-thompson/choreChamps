import { useNavigate } from "react-router-dom"
import { getRoutes } from "./navBarHooks"
import { ThemeSelector } from "./ThemeSelector";
import { useContext } from "react";
import { ChildContext } from "../../context/childContext";
import { useGetChildQuery, useGetChildsPointsQuery } from "../../hooks/peopleHooks";
import { useAuth } from "react-oidc-context";

export const NavBar = () => {
  const auth = useAuth();
  const { selectedChildId } = useContext(ChildContext);
  const childQuery = useGetChildQuery(selectedChildId);
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

  const logout = () => {
    auth.removeUser().then(() => auth.signoutRedirect());
  };

  return (
    <nav className="bg-primary shadow">
      <div className="row mx-0">
        <div className="row justify-content-center d-lg-none">
          <div className="btn-group">
            {routes.map((l) => (
              <button
                key={l.to}
                className={`btn btn-primary ${location.pathname === l.to && "active"}`}
                onClick={() => navigate(l.to)}
              >
                <i className={`${l.icon} fs-4`} />
                <div className="small">{l.text}</div>
              </button>
            ))}
          </div>
        </div>
        {routes.map((r) => (
          <div className="col-auto pe-0 my-auto d-none d-lg-block"
            key={r.to}>
            <button className={`btn btn-primary ${isActive(r.to) && "active"}`}
              onClick={() => navigate(r.to)}>
              <div><i className={r.icon + " me-1 fs-5"} />{r.text}</div>
            </button>
          </div>
        ))}
        <div className="text-lg-end col my-auto">
          {(window.location.pathname.includes("prizes") || window.location.pathname.includes("chores")) && (
            <div className="fw-bold fs-4">
              <span className={`rounded px-2 fst-italic text-${childQuery.data?.cardColor ?? "success"} bg-primary-subtle`}>
                Your Points: {points ?? "N/A"}
              </span>
            </div>
          )}
        </div>
        <div className="col-auto">
          <ThemeSelector />
        </div>
        <div className="col-auto my-auto">
          <button className="btn btn-danger"
            onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}
