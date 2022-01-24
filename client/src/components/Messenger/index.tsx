import React, { memo, useEffect, useRef, useState } from 'react';

// clsx
import clsx from 'clsx';

// react timeago
import TimeAgo from 'react-timeago';

import { usePlayersContext } from 'contexts/PlayersContext';
import randomBgc from 'helpers/randomBackground';
import randomBorderColor from 'helpers/randomBorderColor';

function Messenger() {
  const {
    state: { currentPlayer, messages },
    handleSendMessage,
  } = usePlayersContext();

  const [message, setMessage] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLUListElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    handleSendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    inputRef.current?.focus();

    messagesRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <form onSubmit={handleSubmit} className='col-span-3'>
      <input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={clsx(
          'border-[3px] px-3 text-sm py-2 rounded-lg w-full',
          'transition-all',
          randomBorderColor(),
        )}
        placeholder='💬 Gáy gì đó... ️'
      />
      <ul
        ref={messagesRef}
        className={clsx('h-[50vh] pb-3 overflow-auto overflow-x-hidden mt-3 space-y-2')}
      >
        {messages.map(({ player, msg, createdAt }, idx) => (
          <li key={'message' + idx} className='flex'>
            <span
              title={player.name}
              className={clsx(
                'w-2/12 text-sm self-start truncate py-1.5 px-2 rounded-md',
                'text-white',
                'transition-all',
                randomBgc(),
              )}
            >
              {currentPlayer.id === player.id ? '️🏆 Bạn' : '️️🖕 ' + player.name}
            </span>
            <p className={clsx('text-sm pl-2 w-8/12 break-words', 'text-gray-600')}>{msg}</p>
            <TimeAgo
              className={clsx(
                'text-[13px] text-right w-2/12 pl-2 pr-1.5 whitespace-nowrap',
                'text-gray-500',
              )}
              live={false}
              date={createdAt}
            />
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(Messenger);
