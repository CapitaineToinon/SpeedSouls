export default function Category(json) {
  const { id, name, weblink, miscellaneous } = json;

  return {
    id,
    name,
    weblink,
    hash: weblink.split("#")[1].toLowerCase(),
    misc: miscellaneous
  };
}
