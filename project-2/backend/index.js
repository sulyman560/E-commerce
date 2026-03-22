import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import User from "./models/User.js";
dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// routes
import userRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// test api
app.get("/", (req, res) => res.send("Server running"));

// http server + socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

let onlineUsers = new Map(); // { userId: socketId }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // user online
  socket.on("addUser", async (userId) => {
    socket.userId = userId;
    onlineUsers.set(userId, socket.id);

    await User.findByIdAndUpdate(userId, { online: true });

    // সব user status পাঠাও
    const users = await User.find().select("_id online lastSeen");
    io.emit("allUsersStatus", users);
  });

  // user offline
  socket.on("disconnect", async () => {
    if (socket.userId) {
      await User.findByIdAndUpdate(socket.userId, {
        online: false,
        lastSeen: new Date(),
      });

      onlineUsers.delete(socket.userId);

      const users = await User.find().select("_id online lastSeen");
      io.emit("allUsersStatus", users);
    }
  });

  // send message
  socket.on("sendMessage", (data) => {
    const receiverSocket = onlineUsers.get(data.receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("getMessage", data);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));