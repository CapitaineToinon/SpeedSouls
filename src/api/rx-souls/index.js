import { ajax } from "rxjs/ajax";
import { map, startWith, flatMap, find } from "rxjs/operators";
import formatGame from "./formatting/Game";
import formatLeaderboard from "./formatting/Leaderboard";
import CACHE from "./cache";

const API_ENDPOINT = "https://www.speedrun.com/api/v1";
const SERIE = "souls";

// use distinctUntilChanged() ?

function getSoulsGames() {
  return ajax
    .getJSON(`${API_ENDPOINT}/series/${SERIE}/games?embed=categories,variables`)
    .pipe(map(response => response.data.map(formatGame)));
}

function getLeaderboard(gameLookFor, categoryLookFor) {
  return ajax
    .getJSON(
      `${API_ENDPOINT}/leaderboards/${gameLookFor.id}/category/${categoryLookFor.id}?embed=players,variables`
    )
    .pipe(
      map(response => response.data),
      map(raw => formatLeaderboard(raw, gameLookFor))
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

export function useLeaderboard(gameLookFor, categoryLookFor) {
  return CACHE.get(
    `getSoulsGames/${gameLookFor.id}/${categoryLookFor.id}`,
    getLeaderboard(gameLookFor, categoryLookFor)
  );
}
