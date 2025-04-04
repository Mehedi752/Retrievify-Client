import React from "react";
import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Marque = () => {
    const axiosPublic = useAxiosPublic();

    const { data: posts = [] } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/posts");
            return res.data;
        },
    });

    return (
        <div className="py-6 bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Lost something? Check out all the available posts</h2>
            <Marquee pauseOnHover={true} speed={50} gradient={true} gradientWidth={50}>
                {posts.map((post) => (
                    <Link
                        to={`/posts/${post._id}`}
                        key={post._id}
                        className="mx-6 flex items-center bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-80"
                    >
                        <img
                            src={post.image}
                            alt={post.name}
                            className="w-24 h-24 rounded-lg object-cover mr-4"
                        />
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{post.name}</h3>
                            <p className="text-sm text-gray-600">📌 {post.category} | 📍 {post.location}</p>
                            <p className={`text-xs font-bold uppercase mt-1 px-2 py-1 rounded-full ${post.type === 'lost' ? 'bg-red-100 text-red-600' : post.type === 'found' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{post.type}</p>
                            <Link to={`/posts/${post._id}`} className="mt-3 inline-block bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                                View Details
                            </Link>
                        </div>
                    </Link>
                ))}
            </Marquee>
        </div>
    );
};

export default Marque;
