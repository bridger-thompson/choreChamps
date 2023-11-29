import { useContext } from "react";
import { ChildContext } from "../../../context/childContext";
import { ChildSelect } from "../../../components/ChildSelect";
import { useGetChildsPointsQuery } from "../../../hooks/peopleHooks";
import { useGetPurchaseHistoryQuery } from "../prizeHooks";
import { useNavigate } from "react-router-dom";

export const PrizeHistory = () => {
  const { selectedChildId } = useContext(ChildContext);
  const pointsQuery = useGetChildsPointsQuery(selectedChildId);
  const points = pointsQuery.data;
  const purchaseHistoryQuery = useGetPurchaseHistoryQuery(selectedChildId)
  const history = purchaseHistoryQuery.data ?? []
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-1 col-md-4 col-lg-3 my-auto">
          <button className="btn"
            onClick={() => navigate("/prizes")}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-10 col-md my-auto">
          <h1 className="text-center">Purchased Prizes</h1>
        </div>
        <div className="col-md-4 col-lg-3 my-auto">
          <ChildSelect />
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col col-md-6">
            <div className="fw-bold fs-5">
              Prize
            </div>
          </div>
          <div className="col col-md">
            <div className="fw-bold fs-5">
              Date
            </div>
          </div>
          <div className="col col-md text-end">
            <div className="fw-bold fs-5">
              Points: {points !== undefined ? points : "N/A"}
            </div>
          </div>
        </div>
        {history.map((p) => (
          <div key={p.purchaseId}
            className="row border rounded-3 py-2 frosted-glass my-1">
            <div className="col col-md-6 my-auto">
              {p.prizeName}
            </div>
            <div className="col col-md my-auto">
              {new Date(p.purchasedAt).toDateString()}
            </div>
            <div className="col col-md my-auto text-end">
              <button className="btn btn-primary"
                onClick={() => { }}
                disabled={!points || p.cost > points}>Buy Again</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
