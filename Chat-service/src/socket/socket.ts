import { Server } from "socket.io";
import http from "http";
import express from "express";
import { changeMessageStatusController } from "../libs/controller/chatController/message.status.change.controller";
import dependencies from "../config/dependencies";
import {} from "../utils/interface";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {};

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const getSenderSocketId = (senderId: string): string | undefined => {
  return userSocketMap[senderId];
};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  const userId: string | undefined = socket.handshake.query.userId as string;

  if (userId !== undefined) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId !== undefined) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on("messageRead", async (messageId) => {
    const message: any =await changeMessageStatusController(dependencies, messageId);
    const senderSocketId = getSenderSocketId(message.senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageRead", messageId);
    }
  });
});

export { app, io, server };
