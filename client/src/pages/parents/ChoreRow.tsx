import { FC } from "react"
import { Chore } from "../../models/Chore"
import { useGetChildrenWithChoreQuery } from "./parentHooks"
import { Spinner } from "../../components/ui/Spinner"
import { ChoreEditorModal } from "./ChoreEditorModal"

export const ChoreRow: FC<{
  chore: Chore
}> = ({ chore }) => {
  const chilrenWithChoreQuery = useGetChildrenWithChoreQuery(chore.id)
  const children = chilrenWithChoreQuery.data ?? []

  if (chilrenWithChoreQuery.isLoading) return <Spinner />

  return (
    <div className="row mx-3">
      <div className="col-7 col-md">
        <div className="fw-bold">{chore.name}</div>
        <div>{chore.description}</div>
      </div>
      <div className="col-5 col-md-3">
        <div>Points: {chore.points}</div>
        <div>{getShortDaysOfWeek(chore.daysOfWeek)}</div>
      </div>
      <div className="col col-md-2">
        <div>Assigned:</div>
        <div className="row">
          {children.map((c) => (
            <div className="col-auto pe-0" key={c.id}>
              <div className={`border rounded-circle text-center bg-${c.cardColor}`}
                style={{ width: "25px", height: "25px" }}>
                {c.name[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-auto my-auto">
        <ChoreEditorModal existingChore={chore} childrenWithChore={children.map(c => c.id)} />
      </div>
      <div className="col-auto my-auto">
        <button className="btn btn-outline-danger">
          <i className="bi-trash" />
        </button>
      </div>
    </div>
  )
}


function getShortDaysOfWeek(days: number[]): string {
  const shortDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const validDays = days.filter((day) => day >= 0 && day <= 6);

  if (validDays.length === 7) {
    return "Everyday";
  }
  return validDays.map((day) => shortDays[day]).join(", ");
}