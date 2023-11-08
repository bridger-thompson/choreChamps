import { useContext, useState } from "react";
import { FormatDayWeek } from "../../utils/dateConverter";
import { ChoresDisplay } from "./ChoresDisplay";
import { ChildContext } from "../../context/childContext";
import { ChildSelect } from "../../components/ChildSelect";

export const Chores = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { selectedChild } = useContext(ChildContext)

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 my-auto">
          <button className="btn fs-5"
            onClick={() => setSelectedDate(d => getYesterday(d))}>
            <i className="bi-arrow-left me-1" />{FormatDayWeek(getYesterday(selectedDate))}
          </button>
        </div>
        <div className="col">
          <h1 className="text-center">Chores</h1>
        </div>
        <div className="col-3 text-end my-auto">
          <button className="btn fs-5"
            onClick={() => setSelectedDate(d => getTomorrow(d))}>
            {FormatDayWeek(getTomorrow(selectedDate))}<i className="bi-arrow-right ms-1" />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-2">
          <ChildSelect />
        </div>
      </div>
      {selectedChild &&
        <ChoresDisplay date={selectedDate} childId={selectedChild.id} />
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