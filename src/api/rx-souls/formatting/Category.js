export default function Category(json) {
  const { id, name, weblink, miscellaneous } = json;

  const hash = decodeURIComponent(weblink.split('#')[1]);

  return {
    id,
    name,
    weblink,
    hash: hash.toLowerCase(),
    uglyHash: hash,
    misc: miscellaneous
  };
}
