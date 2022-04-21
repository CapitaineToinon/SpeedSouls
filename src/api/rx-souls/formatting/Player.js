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
    youtube,
    pronouns,
  } = json;
  let country = null;

  if (location) {
    const { code, names } = location.country;
    country = {
      code: code.split('/')[0], // some countries on speedrun.com have region support
      name: names.international,
    };
  }

  if (id !== undefined) {
    name = names.international;
  }

  // for some reason, some player's international name
  // isn't the same as the one used by URLs so I have
  // no other options than formatting based on the link
  const namelink = weblink?.split('/user/')?.[1];

  return {
    id,
    name,
    namelink,
    country,
    weblink,
    signup,
    twitch,
    twitter,
    youtube,
    pronouns,
  };
}
