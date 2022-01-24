import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// types
import { FormEvent } from 'react';

// clsx
import clsx from 'clsx';

// enums
import { PlayerActions } from 'app/actions/players';

import { PATHS } from 'constants/routes';
import { usePlayersContext } from 'contexts/PlayersContext';
import useRandom from 'hooks/useRandom';
import randomBorderColor from 'helpers/randomBorderColor';
import randomBgc from 'helpers/randomBackground';

function Login() {
  const {
    state: { currentPlayer },
    dispatch,
  } = usePlayersContext();

  const [name, setName] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const focusInput = () => inputRef.current?.focus();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    focusInput();

    if (!name.trim()) return;

    dispatch({
      type: PlayerActions.ADD_CURRENT_PLAYER,
      payload: name,
    });
  };

  useEffect(() => {
    focusInput();

    if (currentPlayer.isAuthenticated) {
      navigate(PATHS.HOME);
    }
  }, [currentPlayer.isAuthenticated, navigate]);

  const borderColor = useRandom(randomBorderColor);
  const bgc = useRandom(randomBgc, 1200);

  return (
    <main className={clsx('h-screen')}>
      <form onSubmit={handleSubmit} className='flex-center flex-col w-full h-full'>
        <input
          ref={inputRef}
          onChange={(e) => setName(e.target.value)}
          className={clsx(
            'border-[3px] rounded-md px-3 py-2',
            'transition-all duration-300 ease-out',
            borderColor,
          )}
          placeholder='Nhập tên của bạn'
        />
        <button
          className={clsx(
            'mt-4 px-4 py-3 rounded-lg font-bold text-sm',
            'text-white',
            'transition-all duration-300 ease-in-out',
            'active:scale-95 active:duration-150',
            bgc,
          )}
          type='submit'
        >
          CHƠI NGAY
        </button>
      </form>
    </main>
  );
}

export default Login;
