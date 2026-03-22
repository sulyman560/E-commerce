import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { socket } from "../socket";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import { Menu, X } from 'lucide-react';

const Chat = () => {
  const { user, API } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userStatus, setUserStatus] = useState({}); // { userId: {online, lastSeen} }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔹 1. Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/users`);
        setUsers(res.data.filter((u) => u._id !== user._id));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    if (user) fetchUsers();
  }, [user]);

  // 🔹 2. Socket: add user
  useEffect(() => {
    if (user) socket.emit("addUser", user._id);
  }, [user]);

  // 🔹 3. Receive messages
  useEffect(() => {
    const handleMessage = (data) => {
      if (data.senderId === user._id) return; // ignore own message
      if (activeUser && data.senderId === activeUser._id) {
        setMessages((prev) => [...prev, data]);
      }
    };
    socket.on("getMessage", handleMessage);
    return () => socket.off("getMessage", handleMessage);
  }, [activeUser, user]);

  // 🔹 4. Select user → fetch messages
  const selectUser = async (selectedUser) => {
    setActiveUser(selectedUser);
    try {
      const res = await axios.get(`${API}/api/messages/${user._id}/${selectedUser._id}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 5. Send message
  const sendMessage = async () => {
    if (!input.trim() || !activeUser) return;

    const msgData = {
      senderId: user._id,
      receiverId: activeUser._id,
      text: input,
    };

    try {
      const res = await axios.post(`${API}/api/messages`, msgData);
      setMessages((prev) => [...prev, res.data]);
      socket.emit("sendMessage", res.data);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 6. User status listener
  useEffect(() => {
    const handleStatus = (usersArray) => {
      const statusObj = {};
      usersArray.forEach(u => {
        statusObj[u._id] = { online: u.online, lastSeen: u.lastSeen };
      });
      setUserStatus(statusObj);
    };

    socket.on("allUsersStatus", handleStatus);
    return () => socket.off("allUsersStatus", handleStatus);
  }, []);

  return (
    <div className="w-full flex h-screen backdrop-blur-sm border border-gray-800 rounded-2xl">
      <ChatSidebar
        loading={loading}
        setLoading={setLoading}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        users={users}
        selectUser={selectUser}
        activeUser={activeUser}
        userStatus={userStatus}
      />

      {sidebarOpen ? (
        <X onClick={() => setSidebarOpen(false)} className='cursor-pointer absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden'/>
      ) : (
        <Menu onClick={() => setSidebarOpen(true)} className='cursor-pointer absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden' />
      )}

      <ChatWindow
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
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