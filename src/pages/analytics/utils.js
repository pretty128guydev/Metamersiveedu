export const formatTimeFromMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const remainderMinutes = totalMinutes % 60;

  if (hours === 0) {
    return `${remainderMinutes} min`;
  } else {
    return `${hours} hr ${remainderMinutes} min`;
  }
};

export const getIntervalDescription = (timestamp) => {
  const intervalTypes = ["month", "day", "hour", "minute"];
  const referenceTimestamp = new Date();
  const diffMs = Math.abs(referenceTimestamp - new Date(timestamp));
  const unitsMap = {
    year: 31536000000,
    month: 2628000000,
    week: 604800000,
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000,
  };

  const unitTypeIndex = intervalTypes.findIndex(
    (type) => diffMs >= unitsMap[type]
  );
  if (unitTypeIndex === -1) {
    // throw new Error("Unable to identify the appropriate time interval.");
    return "";
  }

  const intervalCount =
    Math.ceil(diffMs / unitsMap[intervalTypes[unitTypeIndex]]) || 1;
  const pluralModifier = intervalCount !== 1 ? "s" : "";

  return `${intervalCount} ${intervalTypes[unitTypeIndex]}${pluralModifier} ago`;
};

export const formatDate = (inputDate) => {
  // Create a new Date object from the input date string
  const date = new Date(inputDate);

  // Define an array of month names
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

  // Extract the month, day, and year from the Date object
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
