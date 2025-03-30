import React from "react";
import { RxAvatar } from "react-icons/rx";

import { FaPlus } from "react-icons/fa6";

const ChatSidebar = () => {




    return (
        <div className="w-1/3   bg-white shadow-lg p-4 flex flex-col border-r">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chats</h2>
                <button
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    aria-label="Start new chat"
                >
                    <FaPlus/>

                </button>
            </div>

            <div className="flex-1 overflow-y-auto">

            <div className="flex items-center gap-3 cursor-pointer border rounded-2xl border-gray-300 p-2">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                    <RxAvatar  className="w-full h-full" />

                    </div>

                    <div>
                        <p className="font-semibold text-black">Name</p>
                        <p className="text-gray-500 text-sm">(Sender/Receiver): message · 33m</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChatSidebar;