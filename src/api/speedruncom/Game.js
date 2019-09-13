import Category from "./Category";

export default class Game {
  constructor(json) {
    const { id, abbreviation, names, assets, categories } = json;

    this.id = id;
    this.abbreviation = abbreviation;
    this.names = names;
    this.name = this.names.international;
    this.assets = assets;
    this.background = this.assets.background.uri;

    if (categories) {
      this.categories = categories.data.map(category => new Category(category));
    }
  }
}
