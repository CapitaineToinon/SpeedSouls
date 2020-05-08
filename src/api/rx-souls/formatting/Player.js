export default function Player(json) {
  let {
    id,
    name,
    names,
    location,
    weblink,
    signup,
    twitch,
    twitter,
    youtube
  } = json;
  let country = null;

  if (location) {
    const { code, names } = location.country;
    country = {
      code: code.split('/')[0], // some countries on speedrun.com have region support
      name: names.international
    };
  }

  if (id !== undefined) {
    name = names.international;
  }

  return {
    id,
    name,
    country,
    weblink,
    signup,
    twitch,
    twitter,
    youtube
  };
}
