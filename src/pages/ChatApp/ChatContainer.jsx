import { BsChatLeftDots } from "react-icons/bs"; 

const ChatContainer = ( ) => {
  
    return (
        <div className="flex-1 flex flex-col bg-white">
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <BsChatLeftDots className="w-16 h-16"/>
                <h3 className="text-xl font-medium mb-2">No chat selected</h3>
                <p>Select a chat from the sidebar or start a new conversation</p>
            </div>
        </div>
    );
};

export default ChatContainer;