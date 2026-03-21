import { io } from "socket.io-client";

export const socket = io("http://localhost:5000" || "https://chat-server-six.vercel.app"); // backend URL