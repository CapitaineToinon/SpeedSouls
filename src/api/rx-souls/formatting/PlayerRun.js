import formatGame from './Game';
import formatCategory from './Category';
import { getPrimaryTime } from './TimingMethod';

export default function PlayerRun(json) {
  const runs = json
    /* intentionally removing IL runs */
    .filter((raw) => raw.category.data.type === 'per-game')
    .map((raw) => {
      let { game, category, run, place } = raw;
      let { times, videos, date, id, values } = run;

      const formattedGame = formatGame(game.data);

      return {
        place,
        date,
        id,
        values,
        game: formattedGame,
        category: formatCategory(category.data),
        primary_t: getPrimaryTime(times, formattedGame.ruleset),
        showicon: videos !== null,
      };
    });

  let grouped = [];

  runs.forEach((run) => {
    let index = grouped.findIndex((group) => group.game.id === run.game.id);

    if (index === -1) {
      grouped = [
        ...grouped,
        {
          game: run.game,
          runs: [],
        },
      ];

      index = grouped.length - 1;
    }

    grouped[index].runs.push(run);
  });

  return grouped;
}
