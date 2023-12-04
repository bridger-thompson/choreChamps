import { useContext } from "react";
import { ChildContext } from "../../../context/childContext";
import { ChildSelect } from "../../../components/ChildSelect";
import { useGetChildsPointsQuery } from "../../../hooks/peopleHooks";
import { useGetPurchaseHistoryQuery, usePurchasePrizeMutation } from "../prizeHooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "../../../components/ui/Spinner";
import { UndoPurchaseModal } from "./UndoPurchaseModal";
import { FormatDayWeek } from "../../../utils/dateConverter";

export const PrizeHistory = () => {
  const { selectedChildId } = useContext(ChildContext);
  const pointsQuery = useGetChildsPointsQuery(selectedChildId);
  const points = pointsQuery.data;
  const purchaseHistoryQuery = useGetPurchaseHistoryQuery(selectedChildId)
  const history = purchaseHistoryQuery.data ?? []
  const navigate = useNavigate();
  const purchasePrizeMutation = usePurchasePrizeMutation(selectedChildId)

  const purchaseHandler = (prizeId: number) => {
    purchasePrizeMutation.mutateAsync(prizeId).then(() => {
      toast.success("Purchased Prize!")
    })
  }

  if (pointsQuery.isLoading || purchaseHistoryQuery.isLoading) return <Spinner />
  if (pointsQuery.isError) return <h3 className="text-center">Unable to get points</h3>
  if (purchaseHistoryQuery.isError) return <h3 className="text-center">Unable to get history</h3>

  return (
    <div className="container">
      <div className="row">
        <div className="col-1 col-lg-4 col-lg-3 my-auto">
          <button className="btn"
            onClick={() => navigate("/prizes")}>
            <i className="bi-arrow-left fs-3" />
          </button>
        </div>
        <div className="col-10 col-lg my-auto">
          <h1 className="text-center">Purchased Prizes</h1>
        </div>
        <div className="col-lg-4 col-lg-3 my-auto">
          <ChildSelect />
        </div>
      </div>
      {history.length === 0 ? (
        <h3 className="text-center">No Prizes Purchased</h3>
      ) : (
        <>
          <div className="row">
            <div className="col col-lg-6">
              <div className="fw-bold fs-5">
                Prize
              </div>
            </div>
            <div className="col col-lg-3">
              <div className="fw-bold fs-5">
                Date
              </div>
            </div>
            <div className="col-1">
              <div className="fw-bold fs-5">
                Points
              </div>
            </div>
            <div className="col"></div>
            <div className="col-1"></div>
          </div>
          {history.map((p) => (
            <div key={p.purchaseId}
              className="row border rounded-3 py-2 frosted-glass my-1">
              <div className="col col-lg-6 my-auto">
                {p.prizeName}
              </div>
              <div className="col col-lg-3 my-auto">
                {FormatDayWeek(p.purchasedAt)}
              </div>
              <div className="col-1 my-auto">
                {p.cost}
              </div>
              <div className="col pe-0 pe-md-1 my-auto text-end">
                {points && p.cost > points ? (
                  <button className="btn btn-secondary"
                    disabled>
                    <i className="bi-currency-dollar" />
                  </button>
                ) : (
                  <button className="btn btn-success"
                    onClick={() => purchaseHandler(p.prizeId)}>
                    <i className="bi-currency-dollar" />
                  </button>
                )}
              </div>
              <div className="col-auto px-1 my-auto">
                {selectedChildId && <UndoPurchaseModal childId={selectedChildId} purchaseId={p.purchaseId} />}
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  )
}
