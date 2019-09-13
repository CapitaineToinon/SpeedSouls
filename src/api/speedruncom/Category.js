export default class Category {
  constructor(json) {
    const { id, name, weblink, miscellaneous } = json;

    // console.log(json);

    this.id = id;
    this.name = name;
    this.weblink = weblink;
    this.hash = this.weblink.split("#")[1];
    this.misc = miscellaneous;
  }
}
