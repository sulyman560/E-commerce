const ChatSidebar = ({ users, selectUser, activeUser, userStatus }) => {
  return (
    <div className="w-64 bg-gray-400 p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {users.map(u => {
        const status = userStatus[u._id];
        return (
          <div
            key={u._id}
            onClick={() => selectUser(u)}
            className=  {`flex justify-between items-center border m-1 p-2 rounded cursor-pointer ${activeUser?._id === u._id ? "bg-gray-300" : "hover:bg-gray-300"}`}
          >
            <span>
              {
                status?.online ? (
                  <span>{u.username} <span className="text-xs text-green-600">Active now</span></span>
                ) : (
                  <span>{u.username} <span className="text-xs text-gray-600">Offline</span></span>
                )
              }
            </span>

            <span>
              {status?.online ? (
                <span className="w-2 h-2 bg-green-600 border border-green-700 rounded-full inline-block"></span>
              ) : status?.lastSeen ? (
                <>
                <br />
                <small className="text-red-500 text-xs">
                  {Math.floor((new Date() - new Date(status.lastSeen)) / 60000)} min ago
                </small>
                </>
                
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatSidebar;