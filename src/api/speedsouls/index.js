import { SnackbarProgrammatic as Snackbar } from "buefy";
import { getGames } from "@/api/speedruncom/endpoints/series";
import { getFullGame } from "@/api/speedruncom/endpoints/leaderboards";
import formatGame from "./formatting/Game";
import formatRun from "./formatting/Run";
import formatPlayer from "./formatting/Player";

const SERIE = "souls";

async function log(promise) {
  return promise.catch(error => {
    if (error.name !== "AbortError") showError(error);
    throw error;
  });
}

function showError(error) {
  const snack = Snackbar.open({
    indefinite: true,
    message: error.message,
    type: "is-danger",
    position: "is-bottom",
    actionText: "close",
    queue: false,
    onAction: () => {
      snack.close();
    }
  });
}

/**
 * Prepare the function to get the souls games
 */
export function prepareGetGames() {
  let controller = null;

  /**
   * Get the souls games
   */
  async function resolve() {
    controller = new AbortController();
    const { signal } = controller;

    const queryParams = {
      embed: "categories,variables"
    };

    const response = await log(
      getGames(SERIE, {
        queryParams,
        signal
      })
    );

    const { data } = await response.json();
    return data.map(formatGame);
  }

  /**
   * Cancel the request
   */
  function cancel() {
    if (controller) controller.abort();
  }

  return [resolve, cancel];
}

/**
 * Prepare the get game
 */
export function prepareGetGame() {
  const [resolveGetGames, cancelGetGames] = prepareGetGames();

  async function resolve(game) {
    const games = await resolveGetGames();
    const candidate = games.find(g => g.id === game || g.abbreviation === game);

    if (!candidate) {
      const error = new Error("Game not found");
      showError(error);
      throw error;
    }
    return candidate;
  }

  function cancel() {
    cancelGetGames();
  }

  return [resolve, cancel];
}

/**
 * Prepare the function to get the souls games
 */
export function prepareGetLeaderboard() {
  let controller = null;

  /**
   * Formatting the variables for http requests
   * @param {*} previous
   * @param {*} current
   */
  function variablesRecuder(previous, current) {
    previous[`var-${current.id}`] = current.values.default;
    return previous;
  }

  /**
   * Get the souls games
   */
  async function resolve(game, category, variables = []) {
    controller = new AbortController();
    const { signal } = controller;

    const queryParams = {
      ...variables.reduce(variablesRecuder, {}),
      embed: "players,variables"
    };

    const response = await log(
      getFullGame(game, category, {
        queryParams,
        signal
      })
    );

    const { data } = await response.json();
    return data.runs.map(run => {
      const players = run.run.players
        .map(player => {
          return player.hasOwnProperty("id")
            ? data.players.data.find(p => p.id === player.id)
            : player;
        })
        .map(formatPlayer);

      return formatRun(run, players);
    });
  }

  /**
   * Cancel the request
   */
  function cancel() {
    if (controller) controller.abort();
  }

  return [resolve, cancel];
}
