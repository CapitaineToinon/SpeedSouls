import { forkJoin, from } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, startWith, flatMap, find } from "rxjs/operators";
import formatGame from "./formatting/Game";
import formatLeaderboard from "./formatting/Leaderboard";
import CACHE from "./cache";

export const BASE_URL = "https://www.speedrun.com";
export const API_ENDPOINT = `${BASE_URL}/api/v1`;
const SERIE = "souls";

// use distinctUntilChanged() ?

function getSoulsGames() {
  return ajax
    .getJSON(`${API_ENDPOINT}/series/${SERIE}/games?embed=categories,variables`)
    .pipe(map(response => response.data.map(formatGame)));
}

function getLeaderboard(gameLookFor, categoryLookFor, variablesQuery = "") {
  return ajax
    .getJSON(
      `${API_ENDPOINT}/leaderboards/${gameLookFor.id}/category/${categoryLookFor.id}?embed=players,variables&${variablesQuery}`
    )
    .pipe(
      map(response => response.data),
      map(raw => formatLeaderboard(raw, gameLookFor))
    );
}

function getRun(runId) {
  return forkJoin(
    from(getSoulsGames()),
    from(
      ajax
        .getJSON(`${API_ENDPOINT}/runs/${runId}?embed=players,category`)
        .pipe(map(response => response.data))
    )
  ).pipe(
    map(([games, run]) => {
      const game = games.find(g => g.id === run.game);

      if (!game) {
        throw new Error("Run not found");
      }

      run.game = game;
      return run;
    })
  );
}

export function useSoulsGames() {
  return CACHE.get("getSoulsGames", getSoulsGames());
}

export function useSoulsGame(lookFor) {
  return useSoulsGames().pipe(
    startWith([]),
    flatMap(data => data),
    find(game => game.abbreviation === lookFor),
    map(game => {
      if (!game) {
        throw new Error("Game not found");
      }

      return game;
    })
  );
}

export function useSoulsCategory(gameLookFor, categoryLookFor) {
  return useSoulsGame(gameLookFor).pipe(
    flatMap(game => game.categories),
    find(category => category.hash === categoryLookFor),
    map(category => {
      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    })
  );
}

export function useLeaderboard(gameLookFor, categoryLookFor, variables = []) {
  const variablesQuery = variables.reduce((previous, current) => {
    return `${previous}&var-${current.id}=${current.values.default}`;
  }, "");

  return CACHE.get(
    `getSoulsGames/${gameLookFor.id}/${categoryLookFor.id}/${variablesQuery}`,
    getLeaderboard(gameLookFor, categoryLookFor, variablesQuery)
  );
}

export function useRuns(runId) {
  return CACHE.get(`getRun/${runId}`, getRun(runId));
}
