import TimingMethod from "./TimingMethod";

export default class Run {
  constructor(json, players) {
    this.players = players;

    const { place, run } = json;
    const { id, times, videos, weblink, values } = run;

    this.place = place;
    this.id = id;
    this.times = times;
    this.videos = videos;
    this.weblink = weblink;
    this.values = values;
  }

  showicon() {
    return this.videos !== null;
  }

  getPrimaryTime(ruleset) {
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
      return new TimingMethod("realtime_noloads", this.times["primary_t"]);
    }

    return new TimingMethod(
      ruleset["default-time"],
      this.times[ruleset["default-time"] + "_t"]
    );
  }

  getOtherTimes(ruleset) {
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
        .map(t => new TimingMethod(t, 0));
    }

    return ruleset["run-times"]
      .filter(t => t !== ruleset["default-time"])
      .map(t => new TimingMethod(t, this.times[t + "_t"]));
  }
}
