// types
import { Message, Player } from 'models/common';

import { addCurrentPlayer, setMessages, setPlayers, updateScore } from 'app/actionCreators/players';

export interface PlayersInitState {
  currentPlayer: Player & { isAuthenticated: boolean };
  players: Player[];
  messages: Message[];
}

export type PlayerAction = ReturnType<
  typeof addCurrentPlayer | typeof setPlayers | typeof updateScore | typeof setMessages
>;
