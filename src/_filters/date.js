const { DateTime } = require("luxon");

module.exports = (date, format = "dd LLL yyyy") => {
  date = new Date(date);
  return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(
    format
  );
}
