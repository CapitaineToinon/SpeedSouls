function paramsToString(params = {}) {
  return Object.keys(params)
    .map(key => {
      return `${key}=${params[key]}`;
    })
    .join("&");
}

/**
 * Fetch but with support for queryParams
 * @param {*} input
 * @param {*} options
 */
export default function fetchWithQueryParams(input, options) {
  if (
    options.queryParams &&
    typeof options.queryParams === "object" &&
    typeof input === "string"
  ) {
    input += `?${paramsToString(options.queryParams)}`;
    delete options.queryParams;
  } else {
    throw new Error("input is not valid, could not add queryParams to url");
  }

  return fetch(input, options);
}
