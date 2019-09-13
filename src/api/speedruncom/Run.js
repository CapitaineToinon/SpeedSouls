import Player from "./Player";

export default class Run {
  constructor(json, players) {
    this.players = players;
    
    const { place, run } = json;
    const { id, times, videos } = run;
    
    this.place = place;
    this.id = id;
    this.times = times;
    this.videos = videos;
  }

  getPrimaryTime() {
    return this.times["primary_t"];
  }
}