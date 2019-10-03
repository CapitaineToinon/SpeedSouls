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
    id: id,
    abbreviation: abbreviation,
    names: names,
    name: names.international,
    assets: assets,
    variables: variables && variables.data ? variables.data : [],
    background: assets.background.uri,
    ruleset: ruleset
  };

  if (categories) {
    formatted.categories = categories.data
      .filter(category => category.type === "per-game")
      .map(formatCategory);
  }

  return formatted;
}
