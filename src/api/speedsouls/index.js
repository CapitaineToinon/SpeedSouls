import { SnackbarProgrammatic as Snackbar } from "buefy";
import { ToastProgrammatic as Toast } from "buefy";

import Game from "./Game";
import Run from "./Run";
import Player from "./Player";

const SERIE = "souls";
const BASE_URL = "https://www.speedrun.com/api/v1";
const WIKI_URL = "https://wiki.speedsouls.com";

const showError = error => {
  Snackbar.open({
    indefinite: true,
    message: error.message,
    type: "is-danger",
    position: "is-top",
    actionText: "Go home",
    queue: false,
    onAction: () => {
      window.location = "/";
    }
  });
};

const handleErrors = response => {
  if (!response.ok) showError(new Error("Something broke"));
  return response;
};

const sleep = t => new Promise(r => setTimeout(r, t));

class SpeedSouls {
  constructor() {
    this.SERIE = SERIE;
  }

  async get(path) {
    try {
      const response = await fetch(`${BASE_URL}${path}`);
      const response_1 = await handleErrors(response);
      return response_1.json();
    } catch (error) {
      return showError(error);
    }
  }

  async getGame(abbreviation) {
    const json = await this.get(
      `/games/${abbreviation}?embed=categories,variables`
    );
    return new Game(json.data);
  }

  async getGames() {
    const json = await this.get(`/series/${this.SERIE}/games`);
    const games = json.data.map(data => new Game(data));
    return games;
  }

  async getLeaderboard(game, category, variables = []) {
    const variablesparams = variables
      .map(v => `var-${v.id}=${v.value}`)
      .join("&");
    const json = await this.get(
      `/leaderboards/${game}/category/${category}?embed=players,variables&${variablesparams}`
    );
    const runs = json.data.runs.map(run => {
      const players = run.run.players
        .map(player => {
          return player.hasOwnProperty("id")
            ? json.data.players.data.find(p => p.id === player.id)
            : player;
        })
        .map(p => new Player(p));

      return new Run(run, players);
    });
    return runs;
  }
}

export default {
  BASE_URL,
  WIKI_URL,
  install: Vue => {
    Vue.prototype.$speedsouls = new SpeedSouls();
  }
};
