import { Spinner } from "../../../components/ui/Spinner";
import { PrizeEditorModal } from "./PrizeEditorModal";
import { PrizeRow } from "./PrizeRow";
import { useGetParentsPrizesQuery } from "./managePrizesHooks";

export const ManagePrizes = () => {
  const prizesQuery = useGetParentsPrizesQuery();
  const prizes = prizesQuery.data ?? [];

  if (prizesQuery.isLoading) return <Spinner />;
  if (prizesQuery.isError) return <h3 className="text-center">Error getting prizes</h3>;

  return (
    <>
      <div className="text-end mb-1 mt-1">
        <PrizeEditorModal />
      </div>
      <div className="list-group rounded-5">
        {prizes.map((prize) => (
          <div key={prize.id} className="list-group-item bg-transparent">
            <PrizeRow prize={prize} />
          </div>
        ))}
      </div>
    </>
  );
};
