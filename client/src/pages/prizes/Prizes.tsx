import { useContext } from "react";
import { ChildSelect } from "../../components/ChildSelect"
import { ChildContext } from "../../context/childContext";
import { useGetChildQuery } from "../../hooks/peopleHooks";
import { Spinner } from "../../components/ui/Spinner";
import { PrizeDisplay } from "./PrizeDisplay";
import { useNavigate } from "react-router-dom";

export const Prizes = () => {
  const { selectedChildId } = useContext(ChildContext);
  const childQuery = useGetChildQuery(selectedChildId);
  const navigate = useNavigate();

  if (childQuery.isLoading) return <Spinner />;
  if (childQuery.isError) return <h3 className="text-center">Error getting child</h3>;
  if (!childQuery.data) return <h3 className="text-center">Unable to get child</h3>

  return (
    <div className="container">
      <div className="row">
        <div className="col-md offset-md-4 offset-lg-3">
          <h1 className="text-center">Prizes</h1>
        </div>
        <div className="col-md-4 col-lg-3 my-auto">
          <ChildSelect />
        </div>
      </div>
      <button className="btn btn-outline-primary"
        onClick={() => navigate("/prizes/history")}>
        View Purchases
      </button>
      {selectedChildId && <PrizeDisplay child={childQuery.data} />}
    </div>
  )
}
