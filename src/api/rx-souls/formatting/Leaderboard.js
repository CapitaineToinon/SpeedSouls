import formatPlayer from "./Player";
import formatRun from "./Run";

export default function formatLeaderboard(json, game) {
  const { runs, players } = json;
  const { ruleset } = game;

  const formatted = {
    runs: runs.map(run => {
      const formattedPlayers = run.run.players
        .map(player => {
          return player.hasOwnProperty("id")
            ? players.data.find(p => p.id === player.id)
            : player;
        })
        .map(formatPlayer);

      return formatRun(run, formattedPlayers, ruleset);
    })
  };

  return formatted;
}
