import { Server } from "socket.io";
import http from "http";
import express from "express";
import { changeMessageStatusController } from "../libs/controller/chatController/message.status.change.controller";
import dependencies from "../config/dependencies";
import {} from "../utils/interface";
import { find_message_controller } from "../libs/controller/chatController/find.message.controller";

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
 
  socket.on("message:read:done", async (messageId) => {
     console.log('message:read:done');
     
     const message: any = await changeMessageStatusController(dependencies, messageId);
     const senderSocketId = getSenderSocketId(message.senderId);
     if (senderSocketId) {
       io.to(senderSocketId).emit("message:read:done", messageId);
     }
  });
 
  socket.on("messageRead", async (messageId) => {
     console.log('messageRead');
     
     const {message}: any = await find_message_controller(dependencies, messageId);

     if (message?.receiverId) {
      
       const receiverSocketId = getReceiverSocketId(message.receiverId);
      //  console.log('receiverSocketId');
      //  console.log(receiverSocketId);
       
       if (receiverSocketId) {
        // console.log('before ioooo',messageId);
        
         io.to(receiverSocketId).emit("messageRead", messageId);
       }
     }
  });
 });
 

export { app, io, server };
