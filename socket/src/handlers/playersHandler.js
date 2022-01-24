let players = [];
let messages = [];

const addPlayer = (currentPlayer, socketId) => {
  const isJoined = players.some(
    (player) => player.id === currentPlayer.id || player.socketId === socketId,
  );

  if (isJoined) return;

  players.push({ ...currentPlayer, socketId });
};

const removePlayer = (socketId) => {
  players = players.filter((player) => player.socketId !== socketId);
};

const updateScore = (score, socketId) => {
  players = players.map((player) => (player.socketId === socketId ? { ...player, score } : player));
};

const addMessage = (player, msg, createdAt) => {
  messages.unshift({ player, msg, createdAt });
};

module.exports = (io, socket) => {
  const sendMessagesToClient = () => {
    const max = 50;

    if (messages.length > max) {
      messages = messages.slice(0, max + 1);
    }

    io.emit('receiveMessages', messages);
  };

  socket.on('addPlayer', (player) => {
    addPlayer(player, socket.id);

    sendMessagesToClient();
    io.emit('receivePlayers', players);
  });

  socket.on('updateScore', (score) => {
    updateScore(score, socket.id);

    io.emit('receivePlayers', players);
  });

  socket.on('sendMessage', (player, msg, createdAt) => {
    addMessage(player, msg, createdAt);

    sendMessagesToClient();
  });

  socket.on('disconnect', () => {
    removePlayer(socket.id);

    io.emit('receivePlayers', players);
  });
};
