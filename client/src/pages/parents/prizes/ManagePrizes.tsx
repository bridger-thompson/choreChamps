import { useState } from "react";
import { FilterTextRow } from "../../../components/forms/FilterTextRow";
import { Spinner } from "../../../components/ui/Spinner";
import { PrizeEditorModal } from "./PrizeEditorModal";
import { PrizeRow } from "./PrizeRow";
import { useGetParentsPrizesQuery } from "./managePrizesHooks";

export const ManagePrizes = () => {
  const prizesQuery = useGetParentsPrizesQuery();
  const prizes = prizesQuery.data ?? [];
  const [filter, setFilter] = useState("")

  if (prizesQuery.isLoading) return <Spinner />;
  if (prizesQuery.isError) return <h3 className="text-center">Error getting prizes</h3>;

  const filteredPrizes = prizes.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <div className="row my-1">
        <div className="col">
          <FilterTextRow
            changeHandler={(e) => setFilter(e)}
            value={filter}
            labelCol="col-xl-4 col-lg-3 col-md-2 col-3"
            inputCol="col-md col" />
        </div>
        <div className="col-2 text-end">
          <PrizeEditorModal />
        </div>
      </div>
      <div className="list-group rounded-5">
        {filteredPrizes.map((prize) => (
          <div key={prize.id} className="list-group-item bg-transparent frosted-glass">
            <PrizeRow prize={prize} />
          </div>
        ))}
      </div>
    </>
  );
};
