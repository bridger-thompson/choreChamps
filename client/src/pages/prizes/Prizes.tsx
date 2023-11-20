import { useContext } from "react";
import { ChildSelect } from "../../components/ChildSelect"
import { ChildContext } from "../../context/childContext";
import { useGetChildsPointsQuery } from "../../hooks/childHooks";
import { Spinner } from "../../components/ui/Spinner";
import { PrizeDisplay } from "./PrizeDisplay";

export const Prizes = () => {
  const { selectedChild } = useContext(ChildContext);
  const pointsQuery = useGetChildsPointsQuery(selectedChild?.id);
  const points = pointsQuery.data;

  if (pointsQuery.isLoading) return <Spinner />;
  if (pointsQuery.isError) return <h3 className="text-center">Error getting points</h3>;

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
      <div className="fw-bold fs-5 text-end ">
        Your Points: {points !== undefined ? points : "N/A"}
      </div>
      {selectedChild && <PrizeDisplay child={selectedChild} />}
    </div>
  )
}
