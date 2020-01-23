import { BASE_URL } from "../index";
import FWQP from "../fetch";
const ENDPOINT = "series";

/**
 * Retrieves all games of a given series, identified by its ID or abbreviation
 * @param {string} serie Serie's ID or abbreviation
 * @param {*} params URL parameters to be sent with the request.
 */
export function getGames(serie, params = {}) {
  return FWQP(`${BASE_URL}/${ENDPOINT}/${serie}/games`, params);
}
