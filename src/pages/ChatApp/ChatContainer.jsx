import { useState, useRef, useEffect } from "react";
import { BsChatLeftDots, BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CiCamera, CiVideoOn } from "react-icons/ci";
import { MdCall, MdOutlineAttachFile, MdOutlineEmojiEmotions } from "react-icons/md";


const ChatContainer = ({ socket, sender, receiver, refetchChats }) => {
    const axiosPublic = useAxiosPublic();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);
    useEffect(() => {
        if (!socket || !sender?._id) return;

        socket.emit("authenticate", sender._id);

    }, [socket, sender?._id]);


    const { data: msgs = [] } = useQuery({
        queryKey: ['messages', sender.email, receiver.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/messages?sender=${sender._id}&receiver=${receiver._id}`);
            return res.data;
        },
    });
    useEffect(() => {
        msgs.length && setMessages(msgs)
    }, [msgs, setMessages])

    useEffect(() => {
        if (!socket) return;
        const handleReceiveMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };
        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [socket]);

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
        setMessages((prev) => [...prev, message]);
        setNewMessage("");
        socket.emit("sendMessage", message);
    };
    useEffect(() => {
        receiver && messages.length && refetchChats()
    }, [receiver, messages.length, refetchChats])
    return (
        <div className="flex flex-col w-full bg-white border border-gray-300  overflow-hidden">
            <div className="bg-green-700 text-white p-4 font-semibold text-lg border-b border-b-gray-200 flex justify-between">
                <div className="flex items-center gap-2">
                    <img src={receiver.photoURL} alt="" className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col">
                        <h3 className="text-lg">{receiver ? `${receiver?.name}` : "Chat"}</h3>
                        <p className="text-[12px]">Active Now</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <CiVideoOn className="w-7 h-7" />
                    <MdCall className="w-7 h-7" />
                    <BsThreeDotsVertical className="w-7 h-7"/>
    
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 scrollbar-hide bg-gray-200">
                {(messages.length && receiver) ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === sender?._id ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`px-4 py-2 max-w-xs lg:max-w-md rounded-lg shadow-md ${msg.sender === sender?._id
                                ? "bg-blue-500 text-white rounded-br-none"
                                : "bg-white rounded-bl-none"
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
                            {receiver ? <p className="text-center">No messages yet with <br /> <b>{receiver?.email}</b></p> : "No chat selected"}
                        </h3>
                        <p>{receiver ? "Send your first message!" : "Select a user to chat"}</p>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {receiver && (
                <div className="border-t border-t-gray-200 p-3 flex items-center gap-3 bg-gray-100">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-full border-gray-300 outline-none bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <MdOutlineEmojiEmotions className="w-7 h-7 absolute right-37" />
                    <MdOutlineAttachFile className="w-6 h-6 absolute right-29" />
                    <CiCamera className="w-7 h-7 absolute right-20" />
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
