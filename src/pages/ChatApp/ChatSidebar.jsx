import React from "react";
import { RxAvatar } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNowStrict } from 'date-fns';


const ChatSidebar = ({ users }) => {

    const timeAgo = (timestamp) => {
        const agoTime = formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true })
            .replace('minutes', 'min')
            .replace('minute', 'min')
            .replace('hours', 'h')
            .replace('hour', 'h')
            .replace('days', 'd')
            .replace('day', 'd')
            .replace('weeks', 'w')
            .replace('week', 'w')
            .replace('months', 'mo')
            .replace('month', 'mo')
            .replace('years', 'y')
            .replace('year', 'y');

        if (agoTime.includes('seconds')) {
            return 'Just Now';

        }
        return agoTime;
    };

    const { receieverEmail } = useParams()

    return (
        <div className="w-1/3  bg-white shadow-lg p-4 flex flex-col border-r border-r-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chats</h2>
                <button
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    aria-label="Start new chat"
                >
                    <FaPlus />

                </button>
            </div>

            <div className="flex-1 overflow-y-auto">

                {
                    (users.length > 0) && users.map((user) => {
                        return (
                            <Link to={`/chats/${user.email}`} className={`${receieverEmail === user.email ? "bg-cyan-200" : "bg-gray-200"} flex items-center gap-3 cursor-pointer border rounded-lg border-gray-300 p-2 `}>
                                <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full mr-2" />
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center ">
                                        <h3 className="text-lg">{user ? `${user?.userName}` : "Chat"}</h3>
                                        <p className="">{timeAgo(user.timestamp)}</p>
                                    </div>
                                    <p className="text-gray-500 text-sm">{user?.userName ? "" : "UserName"} {user?.lastMessage}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default ChatSidebar;