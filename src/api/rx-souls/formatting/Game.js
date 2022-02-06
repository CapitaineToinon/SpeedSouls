import formatCategory from './Category';

export default function Game(json) {
  const {
    id,
    abbreviation,
    names,
    assets,
    categories,
    ruleset,
    variables,
    weblink,
  } = json;

  let formatted = {
    id,
    abbreviation,
    name: names.international,
    assets,
    variables: variables && variables.data ? variables.data : [],
    background:
      assets.background && assets.background.uri ? assets.background.uri : '',
    coverLarge:
      assets['cover-large'] && assets['cover-large'].uri
        ? assets['cover-large'].uri
        : '',
    ruleset,
    weblink,
  };

  if (categories) {
    formatted.categories = categories.data
      .filter((category) => category.type === 'per-game')
      .map(formatCategory);
  }

  return formatted;
}
