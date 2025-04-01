import ChatSidebar from "./ChatSidebar.jsx";
import ChatContainer from "./ChatContainer.jsx";
import { io } from "socket.io-client";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ChatApp = () => {
  const { receieverEmail } = useParams()
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: sender = {} } = useQuery({
    queryKey: ['currentUser', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });


  const { data: users = [], refetch } = useQuery({
    queryKey: ['chatUsers', sender.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-chats/${sender._id}`);
      return res.data;
    },
  });

  const { data: receiver = {} } = useQuery({
    queryKey: ['currentUser', receieverEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${receieverEmail}`);
      return res.data;
    },
  });
  
  console.log('Users : ', users);
  console.log('Sender : ', sender);
  console.log('Receiver : ', receiver);
  
  const socket = io("http://localhost:5000");
  return (
    <div className="flex h-[calc(100vh-110px)] bg-gray-100">
      <ChatSidebar users={users} />
      <ChatContainer refetchChats={refetch} sender={sender} receiver={receiver} socket={socket} />
    </div>
  );
};

export default ChatApp;