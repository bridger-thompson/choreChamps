import { FC } from "react"
import { FormatYearMonthDay } from "../../utils/dateConverter"
import { useGetChoresForDateQuery, useUpdateChoreStatusMutation } from "./choreHooks"
import { Spinner } from "../../components/ui/Spinner"
import { Child } from "../../models/Child"
import { ChildChore } from "../../models/ChildChore"

export const ChoresDisplay: FC<{
  date: Date,
  child: Child
}> = ({ date, child }) => {
  const choresQuery = useGetChoresForDateQuery(FormatYearMonthDay(date, '-'), child.id)
  const chores = choresQuery.data ?? []
  const updateChoreStatusMutation = useUpdateChoreStatusMutation(FormatYearMonthDay(date, '-'), child.id)

  if (choresQuery.isLoading) return <Spinner />
  if (choresQuery.isError) return <h3 className="text-center">Error getting chores for today</h3>
  if (chores.length === 0) return <h3 className="text-center">No chores today. Enjoy a break!</h3>

  const clickHandler = (chore: ChildChore) => {
    if (chore.status === 'Complete')
      updateChoreStatusMutation.mutate({ childChoreId: chore.id, status: 'Incomplete' })
    else
      updateChoreStatusMutation.mutate({ childChoreId: chore.id, status: 'Complete' })
  }
  return (
    <>
      <div className="row my-1">
        <div className="col-8 fw-bold fs-4">
          Chore
        </div>
        <div className="col-4 col-md-2 text-start ps-0 text-md-center fw-bold fs-4">
          Points
        </div>
      </div>
      {chores.map((c) => (
        <div key={c.id} className="row my-1 fs-5">
          <div className="col-8 px-1">
            <div className={`border border-${child.cardColor} rounded-4 ps-2 py-2`}>
              {c.chore?.name}
            </div>
          </div>
          <div className="col-2 text-center px-1">
            <div className={`border border-${child.cardColor} rounded-4 py-2`}>
              {c.chore?.points}
            </div>
          </div>
          <div className="col-2 text-center px-1">
            <div className={`border border-${child.cardColor} rounded-4 h-100 py-2`}
              onClick={() => clickHandler(c)}>
              <i className={`${c.status === "Complete" ? "bi-star-fill" : ""}`} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
