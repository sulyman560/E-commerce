import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { socket } from "../socket";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import { Menu, X } from 'lucide-react'

const Chat = () => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [userStatus, setUserStatus] = useState({}); // { userId: {online, lastSeen} }



  // 🔹 1. DB থেকে users আনো
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/users' || 'https://chat-server-six.vercel.app/api/users');

        // নিজের user বাদ দাও
        setUsers(res.data.filter((u) => u._id !== user._id));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
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
  const handleMessage = (data) => {
    // নিজের message ignore
    if (data.senderId === user._id) return;

    // শুধু active chat এর message add করো
    if (activeUser && data.senderId === activeUser._id) {
      setMessages((prev) => [...prev, data]);
    }
  };

  socket.on("getMessage", handleMessage);

  return () => {
    socket.off("getMessage", handleMessage); // 🔥 IMPORTANT
  };
}, [activeUser, user]);

  // 🔹 4. user select → DB থেকে message load
  const selectUser = async (selectedUser) => {
    setActiveUser(selectedUser);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${user._id}/${selectedUser._id}` || `https://chat-server-six.vercel.app/api/messages/${user._id}/${selectedUser._id}`
      );

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 5. send message
  const sendMessage = async () => {
  if (!input.trim() || !activeUser) return;

  const msgData = {
    senderId: user._id,
    receiverId: activeUser._id,
    text: input,
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/messages" || "https://chat-server-six.vercel.app/api/messages",
      msgData
    );

    // শুধু API response add করো
    setMessages((prev) => [...prev, res.data]);

    socket.emit("sendMessage", res.data);

    setInput("");
  } catch (err) {
    console.log(err);
  }
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full flex h-screen backdrop-blur-sm border border-gray-800 rounded-2xl">
      <ChatSidebar
        loading={loading} setLoading={setLoading}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
        users={users}
        selectUser={selectUser}
        activeUser={activeUser}
        userStatus={userStatus}
      />

      {
        sidebarOpen ? 
        <X onClick={()=> setSidebarOpen(false)} className='cursor-pointer absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden'/>
        : <Menu  onClick={()=> setSidebarOpen(true)} className='cursor-pointer absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' />
      }

      <ChatWindow
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
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