import { forkJoin, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, startWith, flatMap, find, retry } from 'rxjs/operators';
import formatGame from './formatting/Game';
import formatLeaderboard from './formatting/Leaderboard';
import formatRun from './formatting/Run';
import formatPlayer from './formatting/Player';
import formatPlayerRun from './formatting/PlayerRun';
import CACHE from './cache';

const API_ENDPOINT = `${process.env.VUE_APP_SPEEDRUNCOM}/api/v1`;
const SERIE = 'souls';
const RETRY_COUNT = 3;

function SRC(path) {
  const key = `${API_ENDPOINT}${path}`;
  return CACHE.get(key, ajax.getJSON(key).pipe(retry(RETRY_COUNT)));
}

function getSoulsGames() {
  return SRC(
    `/series/${SERIE}/games?embed=categories,variables,categories.variables,categories.game`
  ).pipe(map(response => response.data.map(formatGame)));
}

function getLeaderboard(gameLookFor, categoryLookFor, variablesQuery = '') {
  return SRC(
    `/leaderboards/${gameLookFor.id}/category/${categoryLookFor.id}?embed=players,variables,category&${variablesQuery}`
  ).pipe(
    map(response => response.data),
    map(raw => formatLeaderboard(raw, gameLookFor))
  );
}

function getRun(runId) {
  return forkJoin(
    from(getSoulsGames()),
    from(
      SRC(
        `/runs/${runId}?embed=players,game,category,category.variables,category.game`
      ).pipe(map(response => response.data))
    )
  ).pipe(
    map(([games, run]) => {
      const game = games.find(g => g.id === run.game.data.id);

      if (!game) {
        throw new Error('Run not found');
      }

      return run;
    }),
    map(formatRun)
  );
}

function getUser(userId) {
  return SRC(`/users/${userId}`).pipe(
    map(response => response.data),
    map(raw => formatPlayer(raw))
  );
}

function getUserPersonalBests(userId) {
  return SRC(
    `/users/${userId}/personal-bests?series=${SERIE}&embed=game,category,category.variables,category.game`
  ).pipe(
    map(response => response.data),
    map(raw => formatPlayerRun(raw))
  );
}

export function useSoulsGames() {
  return getSoulsGames();
}

export function useSoulsGame(lookFor) {
  return useSoulsGames().pipe(
    startWith([]),
    flatMap(data => data),
    find(game => game.abbreviation === lookFor),
    map(game => {
      if (!game) {
        throw new Error('Game not found');
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
        throw new Error('Category not found');
      }

      return category;
    })
  );
}

export function useLeaderboard({ game, ...category }, variables = []) {
  const variablesQuery = variables.reduce((previous, current) => {
    return `${previous}&var-${current.id}=${current.values.default}`;
  }, '');

  return getLeaderboard(game, category, variablesQuery);
}

export function useRuns(runId) {
  return getRun(runId);
}

export function useUser(userId) {
  return getUser(userId);
}

export function useUserPersonalBests(userId) {
  return getUserPersonalBests(userId);
}
