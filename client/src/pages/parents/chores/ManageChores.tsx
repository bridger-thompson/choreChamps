import { Spinner } from "../../../components/ui/Spinner";
import { ChoreEditorModal } from "./ChoreEditorModal";
import { ChoreRow } from "./ChoreRow";
import { useGetChoresQuery } from "../parentHooks";

export const ManageChores = () => {
  const choresQuery = useGetChoresQuery();
  const chores = choresQuery.data ?? []

  if (choresQuery.isLoading) return <Spinner />
  if (choresQuery.isError) return <h3 className="text-center">Error getting chores</h3>

  return (
    <>
      <div className="text-end mb-1 mt-1">
        <ChoreEditorModal />
      </div>
      <div className="list-group  rounded-5">
        {chores.map((c) => (
          <div key={c.id} className="list-group-item bg-transparent">
            <ChoreRow chore={c} />
          </div>
        ))}
      </div>
    </>
  )
}
