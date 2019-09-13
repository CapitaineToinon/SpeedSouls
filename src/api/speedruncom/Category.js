export default class Category {
  constructor(json) {
    const { id, name } = json;

    this.id = id;
    this.name = name;
  }
}
