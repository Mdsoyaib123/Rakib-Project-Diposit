import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import { User_Model } from "../modules/user/user.schema";
import { configs } from "../configs";

const onlineUsers = new Map<string, Set<string>>();

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
    pingTimeout: 20000,
    pingInterval: 5000,
  });

  // 🔐 JWT auth middleware
  io.use((socket: any, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, configs.jwt.access_token_secret!) as any;
      socket.userId = decoded.id; // MongoDB _id

      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket: any) => {
    console.log(`🟢 Socket connected: ${socket.id}`);
    const userId = socket.userId;

    // ---- CONNECT ----
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }

    onlineUsers.get(userId)!.add(socket.id);

    // First socket = online
    if (onlineUsers.get(userId)!.size === 1) {
      await User_Model.findByIdAndUpdate(userId, {
        isOnline: true,
        lastLoginTime: new Date(),
      });
    }

    console.log(`🟢 User ${userId} online`);

    // ---- DISCONNECT ----
    socket.on("disconnect", async () => {
      const sockets = onlineUsers.get(userId);
      if (!sockets) return;

      sockets.delete(socket.id);

      // Last socket = offline
      if (sockets.size === 0) {
        onlineUsers.delete(userId);

        await User_Model.findByIdAndUpdate(userId, {
          isOnline: false,
        });

        console.log(`🔴 User ${userId} offline`);
      }
    });
  });
};
