// types
import { Message, Player } from 'models/common';

import { PlayerActions } from 'app/actions/players';

export const addCurrentPlayer = (name: string) => {
  return {
    type: PlayerActions.ADD_CURRENT_PLAYER,
    payload: name,
  };
};

export const setPlayers = (players: Player[]) => {
  return {
    type: PlayerActions.SET_PLAYERS,
    payload: players,
  };
};

export const updateScore = (score: number) => {
  return {
    type: PlayerActions.UPDATE_SCORE,
    payload: score,
  };
};

export const setMessages = (messages: Message[]) => {
  return {
    type: PlayerActions.UPDATE_SCORE,
    payload: messages,
  };
};
