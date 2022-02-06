import formatCategory from './Category';
import formatPlayer from './Player';
import formatGame from './Game';
import { getPrimaryTime, getOtherTimes } from './TimingMethod';

export default function Run(json) {
  const { players, category, times, game } = json;

  const fullGame = formatGame(game.data);
  const { ruleset } = fullGame;

  return {
    ...json,
    game: fullGame,
    primary_t: getPrimaryTime(times, ruleset),
    others_t: getOtherTimes(times, ruleset),
    players: players.data.map((p) => formatPlayer(p)),
    category: formatCategory(category.data),
  };
}
