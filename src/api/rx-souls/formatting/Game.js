import formatCategory from "./Category";

export default function Game(json) {
  const {
    id,
    abbreviation,
    names,
    assets,
    categories,
    ruleset,
    variables
  } = json;

  let formatted = {
    id,
    abbreviation,
    names,
    name: names.international,
    assets,
    variables: variables && variables.data ? variables.data : [],
    background:
      assets.background && assets.background.uri ? assets.background.uri : "",
    ruleset
  };

  if (categories) {
    formatted.categories = categories.data
      .filter(category => category.type === "per-game")
      .map(formatCategory);
  }

  return formatted;
}
