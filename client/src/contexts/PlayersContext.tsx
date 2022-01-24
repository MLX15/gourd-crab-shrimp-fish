import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';

// socket
import { io } from 'socket.io-client';

// types
import { PlayerAction, PlayersInitState } from 'app/types/players';
import { Message, Player } from 'models/common';
import { Socket } from 'socket.io-client';

// enums
import { PlayerActions } from 'app/actions/players';

import { SOCKET_URL } from 'constants/api';
import playersReducer from 'app/reducers/playersReducer';

const initialState = {
  currentPlayer: {
    id: '',
    name: '',
    score: 0,
    isAuthenticated: false,
  },
  players: [],
  messages: [],
};

export const PlayersContext = createContext<{
  state: PlayersInitState;
  dispatch: React.Dispatch<PlayerAction>;
  handleSendMessage: (msg: string) => void;
}>({ state: initialState, dispatch: () => null, handleSendMessage: () => null });

function PlayersProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playersReducer, initialState);

  const [socket, setSocket] = useState<Socket | null>(null);

  const socketIdRef = useRef<string>('');

  const { isAuthenticated } = state.currentPlayer;

  const handleSendMessage = (msg: string) => {
    socket?.emit('sendMessage', state.currentPlayer, msg, new Date());
  };

  useEffect(() => {
    if (!isAuthenticated || !SOCKET_URL) return;

    setSocket(io(SOCKET_URL));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !socket || socketIdRef.current === socket.id) return;

    socketIdRef.current = socket.id;

    socket.emit('addPlayer', state.currentPlayer);
  }, [isAuthenticated, state.currentPlayer, socket]);

  useEffect(() => {
    if (!isAuthenticated || !socket) return;

    socket.emit('updateScore', state.currentPlayer.score);
  }, [isAuthenticated, socket, state.currentPlayer.score]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receivePlayers', (players: Player[]) => {
      dispatch({
        type: PlayerActions.SET_PLAYERS,
        payload: players,
      });
    });

    socket.on('receiveMessages', (messages: Message[]) => {
      dispatch({
        type: PlayerActions.SET_MESSAGES,
        payload: messages,
      });
    });
  }, [socket]);

  return (
    <PlayersContext.Provider value={{ state, dispatch, handleSendMessage }}>
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayersContext = () => useContext(PlayersContext);

export default PlayersProvider;
