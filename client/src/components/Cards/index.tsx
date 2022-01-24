import { useEffect, useRef, useState } from 'react';

// clsx
import clsx from 'clsx';

// types
import { Card } from 'models/common';

// enums
import { PlayerActions } from 'app/actions/players';

import { usePlayersContext } from 'contexts/PlayersContext';
import randomCards from 'helpers/randomCards';
import randomBorderColor from 'helpers/randomBorderColor';

import Messenger from 'components/Messenger';
import useRandom from 'hooks/useRandom';

function Cards() {
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isGameStart, setIsGameStart] = useState<boolean>(false);

  const {
    state: { currentPlayer, players },
    dispatch,
  } = usePlayersContext();

  const [cards, setCards] = useState<Card[]>(randomCards());

  const counterRef = useRef<number>(0);

  const totalScore = cards.reduce((total, card) => total + card.score, 0);
  const sortedPlayers = players.sort((a, b) => b.score - a.score);
  const rank = sortedPlayers.findIndex((player) => player.id === currentPlayer.id) + 1;

  const handleRandomCards = () => {
    if (isRolling) return;

    setIsRolling(true);
    setIsGameStart(true);

    const timerId = setInterval(() => {
      counterRef.current++;

      setCards(randomCards());

      if (counterRef.current >= 10) {
        clearInterval(timerId);

        counterRef.current = 0;

        setIsRolling(false);
      }
    }, 100);
  };

  useEffect(() => {
    if (isRolling || !isGameStart) return;

    dispatch({
      type: PlayerActions.UPDATE_SCORE,
      payload: totalScore,
    });
  }, [dispatch, isGameStart, isRolling, totalScore]);

  const borderColor = useRandom(randomBorderColor, 1200);

  return (
    <div className='col-span-3'>
      <div className={clsx('grid grid-cols-3 gap-3')}>
        {cards.map((card, idx) => (
          <div
            key={'card' + idx}
            className={clsx(
              'border-4 rounded-xl overflow-hidden p-1.5',
              'transition-all ease-out',
              randomBorderColor(),
              isRolling
                ? ['scale-95 shadow-md', 'duration-150']
                : ['scale-100 shadow-lg', 'duration-300', borderColor],
            )}
          >
            <img
              src={card.photo}
              className={clsx('w-full h-full object-cover rounded-lg')}
              draggable={false}
              alt=''
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-5 mt-5'>
        <div className='text-center text-xs md:text-base col-span-2'>
          <button
            onClick={handleRandomCards}
            className={clsx(
              'mx-auto px-6 py-3 rounded-lg text-lg font-bold',
              'text-white',
              'transition-all duration-200 ease-out',
              isRolling ? 'bg-gray-300' : ['bg-red-500', 'hover:bg-red-400', 'active:scale-[0.85]'],
            )}
          >
            Roll 🍖
          </button>

          <div className='mt-6 uppercase'>
            Điểm hiện tại{' '}
            <span className={clsx('font-bold', 'text-red-500')}>{currentPlayer.score}</span> ⚽
          </div>
          <div className='mt-4 uppercase'>
            TOP <span className={clsx('font-bold', 'text-red-500')}>{rank}</span>
            {rank === 1 && <span> vãi lol 🚀🚀</span>}
            {rank === 2 && <span> rồi 1 nháy nữa ️🏆</span>}
            {rank === 3 && <span> gần tới top rồi ️🏆</span>}
          </div>
          <div className='mt-4 uppercase'>
            Bạn đang chiến đấu{' '}
            {players.length > 1 ? (
              <span>
                với <strong className='text-red-500'>{players.length - 1}</strong> người 🔪
              </span>
            ) : (
              <span>đơn độc</span>
            )}
          </div>
        </div>

        <Messenger />
      </div>
    </div>
  );
}

export default Cards;
