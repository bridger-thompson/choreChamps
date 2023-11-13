import { FC } from "react"
import { FormatYearMonthDay } from "../../utils/dateConverter"
import { useGetChoresForDateQuery } from "./choreHooks"
import { Spinner } from "../../components/ui/Spinner"
import { Child } from "../../models/Child"
import { ChoreRow } from "./ChoreRow"

export const ChoresDisplay: FC<{
  date: Date,
  child: Child
}> = ({ date, child }) => {
  const choresQuery = useGetChoresForDateQuery(FormatYearMonthDay(date, '-'), child.id)
  const chores = choresQuery.data ?? []

  if (choresQuery.isLoading) return <Spinner />
  if (choresQuery.isError) return <h3 className="text-center">Error getting chores for today</h3>
  if (chores.length === 0) return <h3 className="text-center">No chores today. Enjoy a break!</h3>

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
        <ChoreRow chore={c} key={c.id} date={date} child={child} />
      ))}
    </>
  )
}
