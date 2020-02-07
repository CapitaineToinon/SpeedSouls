export default function Player(json) {
  let { id, name, names, location, weblink } = json;
  let country = null;

  if (location) {
    const { code } = location.country;
    country = code.split("/")[0]; // some countries on speedrun.com have region support
  }

  if (id !== undefined) {
    name = names.international;
  }

  return {
    id,
    name,
    country,
    weblink
  };
}
