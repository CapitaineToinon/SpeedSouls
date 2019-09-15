import moment from "moment";

const timingMethodsNames = {
  ingame: "In-Game Time",
  realtime: "Real Time",
  realtime_noloads: "Time without loads"
};

const formatTime = value => {
  if (value === 0) return "";

  const ms = value.toString().split(".").length > 1;
  const time = moment.duration(value, "seconds");
  const format = `${time.hours() > 0 ? "H:" : ""}mm:ss${ms ? ".SSS" : ""}`;
  return moment.utc(value * 1000).format(format);
};

export default class TimingMethod {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  getName() {
    return timingMethodsNames[this.key];
  }

  getTime() {
    return formatTime(this.value);
  }
}
