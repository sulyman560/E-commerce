import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  autoConnect: false, // 🔥 important
});

//https://chat-server-5zt5.onrender.com