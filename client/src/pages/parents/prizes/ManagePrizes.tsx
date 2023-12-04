import { useState } from "react";
import { FilterTextRow } from "../../../components/forms/FilterTextRow";
import { Spinner } from "../../../components/ui/Spinner";
import { PrizeEditorModal } from "./PrizeEditorModal";
import { PrizeRow } from "./PrizeRow";
import { useGetParentsPrizesQuery } from "./managePrizesHooks";
import { FrostedListGroup } from "../../../components/ui/FrostedListGroup";
import { Prize } from "../../../models/Prize";

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
      <FrostedListGroup items={filteredPrizes}
        getKey={(item: Prize) => item.id}
        renderItem={(item: Prize) => <PrizeRow prize={item} />} />
    </>
  );
};
