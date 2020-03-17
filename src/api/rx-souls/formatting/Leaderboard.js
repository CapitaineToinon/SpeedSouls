import formatPlayer from "./Player";
import { getPrimaryTime, getOtherTimes } from "./TimingMethod";

function formatLeaderboardRun(json, players, fullGame, fullCategory) {
  const { place, run } = json;
  const { ruleset } = fullGame;
  const { id, times, videos, weblink, values } = run;

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
    primary_t: getPrimaryTime(times, ruleset),
    others_t: getOtherTimes(times, ruleset),
    showicon: videos !== null
  };
}

export default function formatLeaderboard(json, game) {
  const { runs, players, category } = json;

  const formatted = {
    runs: runs.map(run => {
      const formattedPlayers = run.run.players
        .map(player => {
          return player.hasOwnProperty("id")
            ? players.data.find(p => p.id === player.id)
            : player;
        })
        .map(formatPlayer);

      return formatLeaderboardRun(run, formattedPlayers, game, category.data);
    })
  };

  return formatted;
}
