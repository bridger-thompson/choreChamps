import { useContext, useState } from "react";
import { FormatDayWeek } from "../../utils/dateConverter";
import { ChoresDisplay } from "./ChoresDisplay";
import { ChildContext } from "../../context/childContext";
import { ChildSelect } from "../../components/ChildSelect";
import { useGetChildsPointsQuery } from "../../hooks/childHooks";
import { Spinner } from "../../components/ui/Spinner";

export const Chores = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { selectedChild } = useContext(ChildContext)
  const pointsQuery = useGetChildsPointsQuery(selectedChild?.id)
  const points = pointsQuery.data

  if (pointsQuery.isLoading) return <Spinner />
  if (pointsQuery.isError) return <h3 className="text-center">Error getting points</h3>

  return (
    <div className="container">
      <div className="row">
        <div className="col-md offset-md-4 offset-lg-3">
          <h1 className="text-center">Chores</h1>
        </div>
        <div className="col-md-4 col-lg-3 my-auto">
          <ChildSelect />
        </div>
      </div>
      <div className="fw-bold fs-5 text-end ">
        Points: {points !== undefined ? points : "N/A"}
      </div>
      <div className="row">
        <div className="col pe-0">
          <button className="btn px-0 fw-bold"
            onClick={() => setSelectedDate(d => getYesterday(d))}>
            <i className="bi-arrow-left me-1" />{FormatDayWeek(getYesterday(selectedDate))}
          </button>
        </div>
        <div className="col ps-0 text-end">
          <button className="btn px-0 fw-bold"
            onClick={() => setSelectedDate(d => getTomorrow(d))}>
            {FormatDayWeek(getTomorrow(selectedDate))}<i className="bi-arrow-right ms-1" />
          </button>
        </div>
      </div>
      {selectedChild &&
        <ChoresDisplay date={selectedDate} child={selectedChild} />
      }
    </div>
  )
}

function getYesterday(currentDate: Date): Date {
  const date = new Date(currentDate)
  date.setDate(currentDate.getDate() - 1);
  return date;
}

function getTomorrow(currentDate: Date): Date {
  const date = new Date(currentDate)
  date.setDate(currentDate.getDate() + 1);
  return date;
}