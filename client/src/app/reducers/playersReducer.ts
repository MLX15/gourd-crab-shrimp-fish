// types
import { PlayerAction, PlayersInitState } from 'app/types/players';

// nanoid
import { nanoid } from 'nanoid';

// types
import { Message, Player } from 'models/common';

// enums
import { PlayerActions } from 'app/actions/players';

const playersReducer = (state: PlayersInitState, action: PlayerAction): PlayersInitState => {
  switch (action.type) {
    case PlayerActions.ADD_CURRENT_PLAYER:
      const currentPlayer = {
        id: nanoid(10),
        name: action.payload as string,
        score: 0,
        isAuthenticated: true,
      };

      return {
        ...state,
        currentPlayer,
      };

    case PlayerActions.SET_PLAYERS:
      return { ...state, players: action.payload as Player[] };

    case PlayerActions.UPDATE_SCORE: {
      const currentPlayer = {
        ...state.currentPlayer,
        score: state.currentPlayer.score + (action.payload as number),
      };

      const players = state.players.map((player) =>
        player.id === currentPlayer.id ? currentPlayer : player,
      );

      return { ...state, currentPlayer, players };
    }

    case PlayerActions.SET_MESSAGES:
      return { ...state, messages: action.payload as Message[] };
    default:
      throw new Error('Invalid action');
  }
};

export default playersReducer;
