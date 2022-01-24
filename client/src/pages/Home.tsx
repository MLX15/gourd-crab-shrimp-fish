import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'constants/routes';

import { usePlayersContext } from 'contexts/PlayersContext';

import Cards from 'components/Cards';
import LeaderBoard from 'components/LeaderBoard';

function Home() {
  const {
    state: { currentPlayer },
  } = usePlayersContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentPlayer.isAuthenticated) {
      navigate(PATHS.LOGIN);
    }
  }, [currentPlayer.isAuthenticated, navigate]);

  return (
    <div className='grid grid-cols-4 container mx-auto gap-3 pt-5'>
      <Cards />
      <LeaderBoard />
    </div>
  );
}

export default Home;
