import formatPlayer from './Player';
import { getPrimaryTime, getOtherTimes } from './TimingMethod';

function formatLeaderboardRun(json, players, fullGame, fullCategory) {
  const { place, run } = json;
  const { ruleset } = fullGame;
  const { id, times, videos, weblink, values, date } = run;

  const primary_t = getPrimaryTime(times, ruleset);
  const others_t = getOtherTimes(times, ruleset);
  const time = primary_t.time ? primary_t : others_t[0];

  return {
    game: fullGame,
    category: fullCategory,
    players,
    place,
    id,
    times,
    videos,
    weblink,
    values,
    date,
    primary_t,
    others_t,
    time,
    showicon: videos !== null
  };
}

export default function formatLeaderboard(json, game) {
  const { runs, players, category } = json;

  const formatted = {
    runs: runs.map(run => {
      const formattedPlayers = run.run.players
        .map(player => {
          const isGuest = !Object.prototype.hasOwnProperty.call(player, 'id');
          return isGuest ? player : players.data.find(p => p.id === player.id);
        })
        .map(formatPlayer);

      return formatLeaderboardRun(run, formattedPlayers, game, category.data);
    })
  };

  return formatted;
}
