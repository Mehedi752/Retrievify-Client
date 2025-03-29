import ChatSidebar from "./ChatSidebar.jsx";
import ChatContainer from "./ChatContainer.jsx";

const ChatApp = () => {  
  
  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar  />      
      <ChatContainer />
    </div>
  );
};

export default ChatApp;