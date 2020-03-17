const timingMethodsNames = {
  ingame: "In-Game Time",
  realtime: "Real Time",
  realtime_noloads: "Time without loads"
};

function toDigits(value, count = 2) {
  return `${"0".repeat(count)}${value}`.slice(count * -1);
}

function formatTime(value = 0) {
  if (value === 0) return "";

  let hours = Math.floor(value / 3600);
  value %= 3600;
  let minutes = Math.floor(value / 60);
  let seconds = value % 60;
  let ms = value % 1;

  let output = "";

  if (hours) {
    output = `${hours}:${toDigits(minutes)}:${toDigits(seconds)}`;
  } else {
    output = `${toDigits(minutes)}:${toDigits(seconds)}`;
  }

  if (ms) {
    output = `${output}.${toDigits(ms, 3)}`;
  }

  return output;
}

function formatTimingMethod(key, value) {
  return {
    name: timingMethodsNames[key],
    time: formatTime(value)
  };
}

export function getPrimaryTime(times, ruleset) {
  /**
   * Primary timing method according to the game object
   * Needs to do manual times for categories using realtime_noloads
   * because of a bug in the API.
   *
   * If the category is glitched, we need to check if the run we're
   * looking at has a realtime_noloads time and no realtime time.
   * If that's the case, realtime_noloads will be set to 0 and the
   * actual time will be in realtime so we need to swap those two.
   *
   * If the run has both realtime_nolaod and realtime, then it's good.
   *
   * Because of how the leaderboards are organized by the game's mods,
   * a run cannot have a realtime but no realtime_noloads.
   *
   * See : https://github.com/speedruncomorg/api/issues/69
   */
  if (ruleset["default-time"] === "realtime_noloads") {
    return formatTimingMethod("realtime_noloads", times["primary_t"]);
  }

  return formatTimingMethod(
    ruleset["default-time"],
    times[ruleset["default-time"] + "_t"]
  );
}

export function getOtherTimes(times, ruleset) {
  /**
   * Primary timing method according to the game object
   * Needs to do manual times for categories using realtime_noloads
   * because of a bug in the API.
   *
   * If the category is glitched, we need to check if the run we're
   * looking at has a realtime_noloads time and no realtime time.
   * If that's the case, realtime_noloads will be set to 0 and the
   * actual time will be in realtime so we need to swap those two.
   *
   * If the run has both realtime_nolaod and realtime, then it's good.
   *
   * Because of how the leaderboards are organized by the game's mods,
   * a run cannot have a realtime but no realtime_noloads.
   *
   * See : https://github.com/speedruncomorg/api/issues/69
   */
  if (
    ruleset["default-time"] === "realtime_noloads" &&
    times[ruleset["default-time"] + "_t"] === 0
  ) {
    return ruleset["run-times"]
      .filter(t => t !== ruleset["default-time"])
      .map(t => formatTimingMethod(t, 0));
  }

  return ruleset["run-times"]
    .filter(t => t !== ruleset["default-time"])
    .map(t => formatTimingMethod(t, times[t + "_t"]));
}
