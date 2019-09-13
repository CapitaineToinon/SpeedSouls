export default class Player {
  constructor(json) {
    const { id, rel, name, names, weblink } = json;

    this.id = id;
    this.rel = rel;
    this.name = name;
    this.names = names;
    this.weblink = weblink;
  }

  getName() {
    return (this.rel === "guest")
      ? this.name
      : this.names.international;
  }
}