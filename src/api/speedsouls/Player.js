export default class Player {
  constructor(json) {
    const { id, name, names, weblink } = json;

    this.id = id;
    this.name = name;
    this.names = names;
    this.weblink = weblink;
  }

  getName() {
    return this.id === undefined ? this.name : this.names.international;
  }
}
