import { BASE_URL } from "../index";
import FWQP from "../fetch";
const ENDPOINT = "runs";

/**
 * Retrieve a single run, identified by its ID
 * @param {string} id Run's ID
 * @param {*} params URL parameters to be sent with the request
 */
export function get(id, options = {}) {
  return FWQP(`${BASE_URL}/${ENDPOINT}/${id}`, options);
}
