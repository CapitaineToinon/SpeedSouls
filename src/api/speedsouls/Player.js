export default function Player(json) {
  const { id, name, names, weblink } = json;

  return {
    id,
    name: id === undefined ? name : names.international,
    weblink,
  };
}
