import { useContext } from "react";
import { FormatDayWeek, FormatYearMonthDay } from "../../utils/dateConverter";
import { ChoresDisplay } from "./ChoresDisplay";
import { ChildContext } from "../../context/childContext";
import { ChildSelect } from "../../components/ChildSelect";
import { useGetChildsPointsQuery } from "../../hooks/childHooks";
import { Spinner } from "../../components/ui/Spinner";
import { useSearchParams } from "react-router-dom";

export const Chores = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedChild } = useContext(ChildContext);
  const pointsQuery = useGetChildsPointsQuery(selectedChild?.id);
  const points = pointsQuery.data;
  const selectedDate = getDateFromSearchParam(searchParams.get("date"))

  if (pointsQuery.isLoading) return <Spinner />;
  if (pointsQuery.isError) return <h3 className="text-center">Error getting points</h3>;

  const setSelectedTab = (date: Date) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("date", FormatYearMonthDay(date, '-'));
    setSearchParams(newSearchParams);
  };

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
        Your Points: {points !== undefined ? points : "N/A"}
      </div>
      <div className="row">
        <div className="col pe-0">
          <button className="btn px-0 fw-bold"
            onClick={() => setSelectedTab(getYesterday(selectedDate))}>
            <i className="bi-arrow-left me-1" />{FormatDayWeek(getYesterday(selectedDate))}
          </button>
        </div>
        <div className="col ps-0 text-end">
          <button className="btn px-0 fw-bold"
            onClick={() => setSelectedTab(getTomorrow(selectedDate))}>
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

const getDateFromSearchParam = (searchParam: string | null) => {
  const selectedDate = searchParam ? new Date(searchParam) : new Date();
  const timezoneOffsetMinutes = selectedDate.getTimezoneOffset();
  selectedDate.setMinutes(selectedDate.getMinutes() + timezoneOffsetMinutes);
  return selectedDate
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