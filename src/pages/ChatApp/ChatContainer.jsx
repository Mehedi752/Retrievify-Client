import { useState, useRef, useEffect } from "react";
import { BsChatLeftDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import useAxiosPublic, {  } from "../../hooks/useAxiosPublic";

const ChatContainer = ({ socket, sender, receiver }) => {
    const axiosPublic = useAxiosPublic()
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);
 
    useEffect(() => { 
        const fetchMessages = async () => {
            try {
                const response = await axiosPublic.get(`/messages?sender=${sender._id}&receiver=${receiver._id}`);
                const data = await response.data;
                console.log(response)
                setMessages(data);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [receiver?._id, sender?._id]);

    // Handle socket events
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        const handlePendingMessages = (pendingMessages) => {
            setMessages((prev) => [...prev, ...pendingMessages]);
        };

        socket.on("newMessage", handleNewMessage);
        socket.on("pendingMessages", handlePendingMessages);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("pendingMessages", handlePendingMessages);
        };
    }, [socket]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !sender?._id || !receiver?._id) return;

        const message = {
            text: newMessage,
            sender: sender._id,
            receiver: receiver._id,
            timestamp: new Date().toISOString()
        };

        // Optimistic update
        setMessages((prev) => [...prev, message]);
        setNewMessage("");

        // Emit through socket
        socket.emit("sendMessage", message);
    };

    return (
        <div className="flex flex-col w-full bg-white border rounded-lg overflow-hidden">
            <div className="bg-blue-500 text-white p-4 font-semibold text-lg border-b">
                {receiver ? `Chat with ${receiver?.email}` : "Chat"}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 scrollbar-hide">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex ${msg.sender === sender?._id ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`px-4 py-2 max-w-xs lg:max-w-md rounded-lg shadow-md ${
                                msg.sender === sender?._id 
                                    ? "bg-blue-500 text-white rounded-br-none" 
                                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                            }`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === sender?._id ? "text-blue-100" : "text-gray-500"}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <BsChatLeftDots className="w-16 h-16" />
                        <h3 className="text-xl font-medium mb-2">
                            {receiver ? "No messages yet" : "No chat selected"}
                        </h3>
                        <p>{receiver ? "Send your first message!" : "Select a user to chat"}</p>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {receiver && (
                <div className="border-t p-3 flex items-center gap-3 bg-gray-100">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-full outline-none bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button 
                        onClick={sendMessage} 
                        className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition disabled:opacity-50"
                        disabled={!newMessage.trim()}
                    >
                        <IoSend className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatContainer;