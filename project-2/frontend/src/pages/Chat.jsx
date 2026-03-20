import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { socket } from "../socket";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [userStatus, setUserStatus] = useState({}); // { userId: {online, lastSeen} }



  // 🔹 1. DB থেকে users আনো
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");

        // নিজের user বাদ দাও
        setUsers(res.data.filter((u) => u._id !== user._id));
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchUsers();
  }, [user]);

  // 🔹 2. socket এ user add
  useEffect(() => {
    if (user) {
      socket.emit("addUser", user._id);
    }
  }, [user]);

  // 🔹 3. receive message
  useEffect(() => {
    socket.on("getMessage", (data) => {
      if (activeUser && data.senderId === activeUser._id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off("getMessage");
  }, [activeUser]);

  // 🔹 4. user select → DB থেকে message load
  const selectUser = async (selectedUser) => {
    setActiveUser(selectedUser);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${user._id}/${selectedUser._id}`
      );

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 5. send message
  const sendMessage = () => {
    if (!input.trim() || !activeUser) return;

    const msgData = {
      senderId: user._id,
      receiverId: activeUser._id,
      text: input,
    };

    // socket send
    socket.emit("sendMessage", msgData);

    // UI update
    setMessages((prev) => [...prev, msgData]);
    setInput("");
  };

  // socket listener
useEffect(() => {
  socket.on("updateUserStatus", ({ userId, online, lastSeen }) => {
    setUserStatus(prev => ({
      ...prev,
      [userId]: { online, lastSeen }
    }));
  });

  return () => socket.off("updateUserStatus");
}, []);

  return (
    <div className="flex h-screen rounded-lg">
      <ChatSidebar
        users={users}
        selectUser={selectUser}
        activeUser={activeUser}
        userStatus={userStatus}
      />

      <ChatWindow
        messages={messages}
        user={user}
        activeUser={activeUser}
        sendMessage={sendMessage}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default Chat;