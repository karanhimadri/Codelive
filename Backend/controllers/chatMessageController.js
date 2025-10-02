// Handle client messages and broadcast to the room
const handleMsgFromClient = async (socket, { roomCode, name, msg }) => {
  if (roomCode) {
    socket.to(roomCode).emit("msgFromServer", { name: name, message: msg });
  }
};

module.exports = { handleMsgFromClient };
