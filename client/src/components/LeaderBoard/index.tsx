// clsx
import clsx from 'clsx';

import { usePlayersContext } from 'contexts/PlayersContext';
import randomBgc from 'helpers/randomBackground';
import useRandom from 'hooks/useRandom';

function LeaderBoard() {
  const {
    state: { players, currentPlayer },
  } = usePlayersContext();

  const sortedPlayers = players.slice(0, 11).sort((a, b) => b.score - a.score);

  return (
    <div className='col-span-1 pr-1.5'>
      <BoardTitle playersCount={players.length} />
      <ul className='mt-3 h-[90vh] overflow-x-auto space-y-2'>
        {sortedPlayers.map((player, idx) => (
          <li
            title={player.name}
            key={player.id}
            className={clsx(
              'flex-between px-3 py-2.5 rounded-md',
              'text-white',
              'transition-all',
              randomBgc(),
            )}
          >
            <span
              className={clsx(
                'text-sm md:text-base',
                currentPlayer.id !== player.id && 'truncate w-3/12',
              )}
            >
              {idx === 0 ? '️🏆' : idx === 1 ? '🎓' : idx === 2 ? '👑' : '🐧'}{' '}
              {currentPlayer.id === player.id ? 'Bạn đang ở đây nè ' + player.name : player.name}
            </span>
            <span className='text-xs md:text-sm font-bold'>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderBoard;

function BoardTitle({ playersCount }: { playersCount: number }) {
  const bgc = useRandom(randomBgc);

  return (
    <h2
      className={clsx(
        'px-3 py-3 rounded-md shadow-zinc-700',
        'text-white',
        'transition-all duration-500 ease-linear',
        bgc,
      )}
    >
      <strong>📖 Dead Note</strong> ({playersCount} cua thủ đã tham gia)
    </h2>
  );
}
