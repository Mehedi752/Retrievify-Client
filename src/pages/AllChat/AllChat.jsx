import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllChat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

 
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users`);
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }


  const filteredUsers = users.filter((u) => u.email !== user?.email);

 
  const handleChatClick = (targetUser) => {
   
    navigate(
      `/chat?currentUser=${encodeURIComponent(
        user.email
      )}&targetUser=${encodeURIComponent(targetUser.email)}`
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chats</h2>
      {filteredUsers.length > 0 ? (
        <ul className="space-y-2">
          {filteredUsers.map((u) => (
            <li
              key={u.email}
              className="flex items-center p-2 border rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => handleChatClick(u)}
            >
              <img
                src={u.photoURL}
                alt={u.name}
                className="w-10 h-10 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default AllChat;
