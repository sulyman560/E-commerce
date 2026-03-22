import { io } from "socket.io-client";

export const socket = io("https://chat-server-5zt5.onrender.com", {
  transports: ["websocket"], // 🔥 important
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});