let today = new Date();

const getDate = () => {
  return today.getDate();
};

const getDay = () => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = today.getDay();
  weekday = weekdays[weekday];

  return weekday;
};

const getMonth = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = today.getMonth();
  month = months[month];

  return month;
};

export { getDate, getDay, getMonth };
