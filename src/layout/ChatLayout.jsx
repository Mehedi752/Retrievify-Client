import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar'; 


const ChatLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default ChatLayout;