import React, { useEffect, useState } from "react";
import { useSocket } from "../../provider/SocketProvider";
import { useSearchParams } from "react-router-dom";

const Chat = () => {
  const socket = useSocket();
  const [searchParams] = useSearchParams();

  // Get current user and target user from URL query parameters
  const currentUser = searchParams.get("currentUser") || "Guest";
  const targetUser = searchParams.get("targetUser") || "";

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketID, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      socket.emit("register", currentUser);
      console.log("Connected with socket ID:", socket.id);
    });

    const handlePrivateMessage = (data) => {
      console.log("Received private message:", data);
      setMessages((prev) => [...prev, data]);
    };

    socket.on("private-message", handlePrivateMessage);

    return () => {
      socket.off("private-message", handlePrivateMessage);
    };
  }, [socket, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetUser) {
      alert("Select a user to chat with!");
      return;
    }
    socket.emit("private-message", {
      toUser: targetUser,
      message,
      fromUser: currentUser,
    });
    setMessages((prev) => [...prev, { fromUser: currentUser, message }]);
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border border-gray-300 rounded-md shadow-sm">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Socket ID:</span> {socketID}
        </p>
        <p className="text-lg font-medium">
          Chat with: {targetUser ? targetUser : "No user selected"}
        </p>
      </div>

      <div className="h-80 overflow-y-auto p-4 bg-gray-50 border border-gray-200 rounded-md mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            {msg.fromUser === currentUser ? (
              <p className="text-blue-600">
                <span className="font-semibold">Me: </span>
                {msg.message}
              </p>
            ) : (
              <p className="text-green-600">
                <span className="font-semibold">{msg.fromUser}: </span>
                {msg.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
