import { FC } from "react"
import { FormatYearMonthDay } from "../../utils/dateConverter"
import { useGetChoresForDateQuery } from "./choreHooks"
import { Spinner } from "../../components/ui/Spinner"

export const ChoresDisplay: FC<{
  date: Date
}> = ({ date }) => {
  const choresQuery = useGetChoresForDateQuery(FormatYearMonthDay(date, '-'), 1)
  const chores = choresQuery.data ?? []

  if (choresQuery.isLoading) return <Spinner />
  if (choresQuery.isError) return <h3 className="text-center">Error getting chores for today</h3>
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
            <div className="border rounded ps-2">
              {c.chore?.name}
            </div>
          </div>
          <div className="col-2 text-center px-1">
            <div className="border rounded">
              {c.chore?.points}
            </div>
          </div>
          <div className="col-2 text-center px-1">
            <div className="border rounded h-100">
              <i className={`${c.status === "Complete" ? "bi-star-fill" : ""}`} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
