import Category from "./Category";

export default class Game {
  constructor(json) {
    const {
      id,
      abbreviation,
      names,
      assets,
      categories,
      ruleset,
      variables
    } = json;

    // console.log(json);

    this.id = id;
    this.abbreviation = abbreviation;
    this.names = names;
    this.name = this.names.international;
    this.assets = assets;
    this.variables = variables && variables.data ? variables.data : [];
    this.background = this.assets.background.uri;
    this.ruleset = ruleset;

    if (categories) {
      this.categories = categories.data
        .filter(category => category.type === "per-game")
        .map(category => new Category(category));
    }
  }
}
