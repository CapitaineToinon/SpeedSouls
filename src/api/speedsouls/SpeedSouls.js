import createSeriesEndpoint from "speedrundotcom/src/endpoints/series";
import createLeaderboardsEndpoint from "speedrundotcom/src/endpoints/leaderboards";
import formatGame from "./Game";
import formatRun from "./Run";
import formatPlayer from "./Player";

const defaultOptions = {
  SERIE: "souls",
  BASE_URL: "",
  errorHandler: e => {
    throw e;
  }
};

/**
 * Custom HTTP client using fetch
 */
function createClient(BASE_URL, errorHandler) {
  async function get(url, params = {}) {
    const paramsUrl = Object.keys(params)
      .map(key => {
        return `${key}=${params[key]}`;
      })
      .join("&");

    try {
      /**
       * Parsing the JSON manually instead of using response.json();
       * because the response could be html if the url is wrong
       */
      const response = await fetch(`${BASE_URL}${url}?${paramsUrl}`);
      const text = await response.text();
      return JSON.parse(text);
    } catch (e) {
      errorHandler(e);
    }
  }

  return {
    get
  };
}

/**
 * Formatting the variables for http requests
 * @param {*} previous
 * @param {*} current
 */
function variablesRecuder(previous, current) {
  previous[`var-${current.id}`] = current.value;
  return previous;
}

/**
 * Main api
 * @param {string} serie
 */
export default function SpeedSouls(options = {}) {
  const { SERIE, BASE_URL, errorHandler } = {
    ...defaultOptions,
    ...options
  };

  const client = createClient(BASE_URL, errorHandler);
  const series = createSeriesEndpoint(client);
  const leaderboards = createLeaderboardsEndpoint(client);

  /**
   * Get the souls games
   */
  async function getGames() {
    const response = await series
      .getGames(SERIE, {
        embed: "categories,variables"
      })
      .then(response => response.data);

    return response.map(formatGame);
  }

  /**
   * Return a souls game
   * @param {string} game Game's ID or abbreviation
   */
  async function getGame(game) {
    const candidate = await getGames().then(games =>
      games.find(g => g.id === game || g.abbreviation === game)
    );

    if (!candidate) {
      // Fake error to prevent other games than souls games to be loaded
      errorHandler(new Error("Game not found"));
    }

    return candidate;
  }

  /**
   * Get FullGame leaderboards for a game and category
   * @param {string} game Game's ID or abbreviation
   * @param {string} category Category's ID or abbreviation
   * @param {Object} variables The variables to be sent with the request
   */
  async function getLeaderboard(game, category, variables = []) {
    const params = {
      ...variables.reduce(variablesRecuder, {}),
      embed: "players,variables"
    };

    const data = await leaderboards
      .getFullGame(game, category, params)
      .then(response => response.data);

    const runs = data.runs.map(run => {
      const players = run.run.players
        .map(player => {
          return player.hasOwnProperty("id")
            ? data.players.data.find(p => p.id === player.id)
            : player;
        })
        .map(formatPlayer);

      return formatRun(run, players);
    });
    return runs;
  }

  return {
    getGames,
    getGame,
    getLeaderboard
  };
}
