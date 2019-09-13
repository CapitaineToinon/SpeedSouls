import Game from "./Game";
import Run from "./Run";
import Player from "./Player";

const BASE_URL = "https://www.speedrun.com/api/v1";
const SERIE = "souls";

const sleep = t => new Promise(r => setTimeout(r, t));

class SpeedSouls {
  constructor() {
    this.serie = SERIE;
  }

  async get(path) {
    await sleep(200);
    const response = await fetch(`${BASE_URL}${path}`);
    return await response.json();
  }

  async getGame(abbreviation) {
    const json = await this.get(`/games/${abbreviation}?embed=categories`);
    return new Game(json.data);
  }

  async getGames() {
    const json = await this.get(`/series/${this.serie}/games`);
    const games = json.data.map(data => new Game(data));
    return games;
  }

  async getLeaderboard(game, category, variables = {}) {
    const json = await this.get(`/leaderboards/${game}/category/${category}?embed=players,variables`);
    const players = json.data.players.data.map(player => new Player(player));
    const runs = json.data.runs.map((run, index) => new Run(run, [players[index]]));
    return runs;
  }
}

export default {
  install: Vue => {
    Vue.prototype.$speedsouls = new SpeedSouls();
  }
};
