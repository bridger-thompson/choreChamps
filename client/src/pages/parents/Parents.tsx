import { Spinner } from "../../components/ui/Spinner";
import { ChoreEditorModal } from "./ChoreEditorModal";
import { ChoreRow } from "./ChoreRow";
import { useGetChoresQuery } from "./parentHooks"

export const Parents = () => {
  const choresQuery = useGetChoresQuery();
  const chores = choresQuery.data ?? []

  if (choresQuery.isLoading) return <Spinner />
  if (choresQuery.isError) return <h3 className="text-center">Error getting chores</h3>

  return (
    <div className="container">
      <div className="row">
        <div className="col offset-1">
          <h1 className="text-center">Parent</h1>
        </div>
        <div className="col-1 my-auto">
          <ChoreEditorModal />
        </div>
      </div>
      <div className="list-group rounded-5">
        {chores.map((c) => (
          <div key={c.id} className="list-group-item">
            <ChoreRow chore={c} />
          </div>
        ))}
      </div>
    </div>
  )
}
