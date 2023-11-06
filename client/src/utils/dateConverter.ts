export const DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const ShortMonthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function FormatYearMonthDayTimeNoSeconds(
  value: Date | string | undefined
) {
  if (!value) return "";
  const date = new Date(value);
  return FormatYearMonthDay(date) + " " + FormatTimeNoSeconds(date);
}

export function FormatMonthDayYearTimeNoSeconds(
  value: Date | string | undefined
) {
  if (!value) return "";
  const date = new Date(value);
  return FormatMonthDayYear(date) + " " + FormatTimeNoSeconds(date);
}

export function FormatMonthDayAtTimeNoSeconds(
  value: Date | string | undefined
) {
  if (!value) return "";
  const date = new Date(value);
  return FormatMonthDayAt(date) + " " + FormatTimeNoSeconds(date);
}

export function FormatDatetimeLocalInput(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return FormatYearMonthDay(date, "-") + "T" + FormatHourMinute(date);
}

export function FormatTimeNoSeconds(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function FormatHourMinute(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
}

export function FormatDayWeek(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);

  const formattedDate = `${DaysOfWeek[date.getDay()]}, ${
    ShortMonthsOfYear[date.getMonth()]
  } ${date.getDate()}`;
  return formattedDate;
}

export function FormatYearMonthDay(
  value: Date | string | undefined,
  delimiter: string = "/"
) {
  if (!value) return "";
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year + delimiter + month + delimiter + day}`;
}

export function FormatMonthDayYear(
  value: Date | string | undefined,
  delimiter: string = "/"
) {
  if (!value) return "";
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month + delimiter + day + delimiter + year}`;
}

export function FormatMonthDayAt(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  const month = getAbbreviatedMonth(date);
  const day = String(date.getDate());
  return `${month} ${day} @`;
}

export function FormatMonthAbbrevDay(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  const month = getAbbreviatedMonth(date);
  const day = String(date.getDate());
  return `${month} ${day}`;
}

function getAbbreviatedMonth(date: Date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[date.getMonth()];
}

export function FormatLongMonthDayTime(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleString("en-US", options);
}

export function FormatLongMonthDay(value: Date | string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  return date.toLocaleString("en-US", options);
}

export function FormatDynamicDate(value: Date | string | undefined): string {
  if (value === undefined) {
    return "";
  }

  const dateValue = new Date(value);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - dateValue.getTime()) / (1000 * 3600 * 24)
  );

  if (diffInDays <= 0) {
    return FormatTimeNoSeconds(dateValue);
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < now.getDay()) {
    return dateValue.toLocaleDateString(undefined, { weekday: "long" });
  } else {
    return dateValue.toLocaleDateString(undefined, {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
  }
}

export function getCurrentAcademicYear(): string {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (currentMonth >= 1 && currentMonth <= 7) {
    const academicYearStart = (currentYear - 1) % 100; // Get the last two digits of the previous year
    const academicYearEnd = academicYearStart + 1; // Academic year ends in the next calendar year
    return `${academicYearStart}${academicYearEnd}`;
  }

  const academicYearStart = currentYear % 100; // Get the last two digits of the current year
  const academicYearEnd = academicYearStart + 1; // Academic year ends in the next calendar year
  return `${academicYearStart}${academicYearEnd}`;
}
