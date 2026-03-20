const ChatSidebar = ({ users, selectUser, activeUser, userStatus }) => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {users.map(u => {
        const status = userStatus[u._id];
        return (
          <div
            key={u._id}
            onClick={() => selectUser(u)}
            className=  {`flex justify-between items-center p-2 rounded cursor-pointer ${activeUser?._id === u._id ? "bg-gray-300" : "hover:bg-gray-300"}`}
          >
            <span>{u.username}</span>

            <span>
              {status?.online ? (
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
              ) : status?.lastSeen ? (
                <small className="text-gray-500 text-xs">
                  {Math.floor((new Date() - new Date(status.lastSeen)) / 60000)} min ago
                </small>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatSidebar;