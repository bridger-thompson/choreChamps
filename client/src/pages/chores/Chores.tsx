import { useContext } from "react";
import { FormatDayWeek, FormatYearMonthDay } from "../../utils/dateConverter";
import { ChoresDisplay } from "./ChoresDisplay";
import { ChildContext } from "../../context/childContext";
import { ChildSelect } from "../../components/ChildSelect";
import { useGetChildQuery } from "../../hooks/peopleHooks";
import { Spinner } from "../../components/ui/Spinner";
import { useSearchParams } from "react-router-dom";

export const Chores = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedChildId } = useContext(ChildContext);
  const childQuery = useGetChildQuery(selectedChildId)
  const selectedDate = getDateFromSearchParam(searchParams.get("date"))

  if (childQuery.isLoading) return <Spinner />;
  if (childQuery.isError) return <h3 className="text-center">Error getting child</h3>;
  if (!childQuery.data) return <h3 className="text-center">Unable to get child</h3>;

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
      <div className="row">
        <div className="col-auto pe-0">
          <button className="btn btn-outline-primary rounded-circle"
            onClick={() => setSelectedTab(getYesterday(selectedDate))}>
            <i className="bi-arrow-left fs-5" />
          </button>
        </div>
        <div className="col px-0 text-center fw-bold fs-5 my-auto">{FormatDayWeek(selectedDate)}</div>
        <div className="col-auto ps-0">
          <button className="btn btn-outline-primary rounded-circle"
            onClick={() => setSelectedTab(getTomorrow(selectedDate))}>
            <i className="bi-arrow-right fs-5" />
          </button>
        </div>
      </div>
      {selectedChildId &&
        <ChoresDisplay date={selectedDate} child={childQuery.data} />
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