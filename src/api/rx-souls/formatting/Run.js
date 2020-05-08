import formatCategory from './Category';
import formatPlayer from './Player';
import { getPrimaryTime, getOtherTimes } from './TimingMethod';

export default function Run(json, game) {
  const { players, category, times } = json;
  const { ruleset } = game;

  return {
    ...json,
    game,
    primary_t: getPrimaryTime(times, ruleset),
    others_t: getOtherTimes(times, ruleset),
    players: players.data.map(p => formatPlayer(p)),
    category: formatCategory(category.data)
  };
}
