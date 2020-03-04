import moment from "moment";

const timingMethodsNames = {
  ingame: "In-Game Time",
  realtime: "Real Time",
  realtime_noloads: "Time without loads"
};

function formatTime(value) {
  if (value === 0) return "";
  const ms = value.toString().split(".").length > 1;
  const time = moment.duration(value, "seconds");
  const format = `${time.hours() > 0 ? "H:" : ""}mm:ss${ms ? ".SSS" : ""}`;
  return moment.utc(value * 1000).format(format);
}

export default function formatTimingMethod(key, value) {
  return {
    name: timingMethodsNames[key],
    time: formatTime(value)
  };
}
