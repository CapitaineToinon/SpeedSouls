import formatTimingMethod from "./TimingMethod";

export default function Run(json, players) {
  const { place, run } = json;
  const { id, times, videos, weblink, values } = run;

  function getPrimaryTime(ruleset) {
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
      return formatTimingMethod("realtime_noloads", this.times["primary_t"]);
    }

    return formatTimingMethod(
      ruleset["default-time"],
      this.times[ruleset["default-time"] + "_t"]
    );
  }

  function getOtherTimes(ruleset) {
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
      this.times[ruleset["default-time"] + "_t"] === 0
    ) {
      return ruleset["run-times"]
        .filter(t => t !== ruleset["default-time"])
        .map(t => formatTimingMethod(t, 0));
    }

    return ruleset["run-times"]
      .filter(t => t !== ruleset["default-time"])
      .map(t => formatTimingMethod(t, this.times[t + "_t"]));
  }

  return {
    players,
    place,
    id,
    times,
    videos,
    weblink,
    values,
    getPrimaryTime,
    getOtherTimes,
    showicon: videos !== null
  };
}
