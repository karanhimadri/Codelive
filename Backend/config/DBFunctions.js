const { getCurrentTime } = require("../utils/currentTime");

const Rooms = new Map();
const UserToRoom = new Map();

const createNewRoom = (roomId, createdBy = "") => {
  if (Rooms.has(roomId)) {
    return { success: false, message: "Room already exists." };
  }

  const room = {
    created_by: createdBy,
    created_at: getCurrentTime(),
    users: []
  };

  Rooms.set(roomId, room);
  return { success: true, message: "Room successfully created." };
};

const joinRoom = (roomId, userId, name) => {
  if (!Rooms.has(roomId)) {
    return { success: false, message: "Room does not exist." };
  }

  const currentRoom = Rooms.get(roomId);
  if (currentRoom.users.some(u => u.userId === userId)) {
    return { success: false, message: "User already in room." };
  }

  const userInfo = {
    name,
    joined_at: getCurrentTime(),
    userId
  };

  currentRoom.users.push(userInfo);
  UserToRoom.set(userId, { roomId, name });

  return { success: true, message: "User successfully joined the room." };
};

const getRoomIdFromUserId = (userId) => {
  const info = UserToRoom.get(userId);
  if (info && info.roomId) {
    return { success: true, roomId: info.roomId, name: info.name };
  }
  return { success: false, message: "RoomId not found." };
};

const totalUsersAtRoom = (roomId) => {
  if (!Rooms.has(roomId)) {
    return { success: false, message: "Room does not exist." };
  }

  const currentRoom = Rooms.get(roomId);
  return { success: true, count: currentRoom.users.length };
};

const leaveRoom = (roomId, userId) => {
  if (!Rooms.has(roomId)) {
    return { success: false, message: "Room does not exist." };
  }
  const currentRoom = Rooms.get(roomId);
  const userIndex = currentRoom.users.findIndex(u => u.userId === userId);

  if (userIndex === -1) {
    return { success: false, message: "User is not in the room." };
  }

  currentRoom.users.splice(userIndex, 1);
  UserToRoom.delete(userId);

  return { success: true, message: "User removed from the room." };
};

const deleteRoom = (roomId) => {
  if (!Rooms.has(roomId)) {
    return { success: false, message: "Room does not exist." };
  }

  const currentRoom = Rooms.get(roomId);
  if (currentRoom.users.length === 0) {
    Rooms.delete(roomId);
    return { success: true, message: "Room deleted." };
  }

  return { success: false, message: "Room is not empty." };
};

const getAllUsersById = (roomId) => {
  const info = Rooms.get(roomId);

  if (!info) {
    return { success: false, message: "Room not found." };
  }

  return {
    success: true,
    created_by: info.created_by,
    created_at: info.created_at,
    users: info.users
  };
}


module.exports = {
  createNewRoom,
  joinRoom,
  totalUsersAtRoom,
  leaveRoom,
  deleteRoom,
  getRoomIdFromUserId,
  getAllUsersById
};
