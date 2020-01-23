import { BASE_URL } from "../index";
import FWQP from "../fetch";
const ENDPOINT = "leaderboards";

/**
 * Returns a full-game leaderboard
 * @param {string} game Game's ID or abbreviation
 * @param {string} category Category's ID or abbreviation
 * @param {*} params URL parameters to be sent with the request.
 */
export function getFullGame(game, category, options = {}) {
  return FWQP(`${BASE_URL}/${ENDPOINT}/${game}/category/${category}`, options);
}
