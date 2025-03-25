import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllPosts = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const categories = ["All", "Mobile", "Laptop", "Electronics", "Jewelry", "Documents", "Others"];

    const { data: posts = [], refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/posts");
            return res.data;
        },
    });

    // Function to handle category filter
    const filterPosts = (category) => {
        setSelectedCategory(category);
    };

    // Filter posts based on selected category
    const filteredByCategory = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());

    // Filter posts based on search term
    const finalFilteredPosts = searchTerm
        ? filteredByCategory.filter(post => post.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : filteredByCategory;

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-12 px-4">

                {/* Search & Filter Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="🔍 Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3 p-3 bg-white rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => filterPosts(e.target.value)}
                        className="p-3 bg-white rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {finalFilteredPosts.length > 0 ? (
                        finalFilteredPosts.map(post => (
                            <div
                                key={post._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
                            >
                                <img
                                    src={post.image}
                                    alt={post.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    <h2 className="text-lg font-semibold text-gray-900">{post.name}</h2>
                                    <p className="text-sm text-gray-600 mt-1">📌 {post.category}</p>
                                    <p className="text-sm text-gray-600 mt-1">📍 {post.location}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-sm text-gray-500">📅 {new Date(post.timestamp).toLocaleDateString()}</p>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${post.type === 'lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                            {post.type}
                                        </span>
                                    </div>

                                    {
                                        post.type === 'lost' ? (
                                            <button
                                                className="mt-5 w-full bg-[#1a237e] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transitio"
                                            >
                                                View Details
                                            </button>
                                        ) : (
                                            <div className="flex justify-between items-center gap-3 mt-5">
                                                <button
                                                    className="w-full bg-[#1a237e] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transitio"
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    className="w-full bg-green-200 hover:bg-green-300 text-green-600 hover:text-green-700 font-semibold py-2 px-4 rounded-lg transitio"
                                                >
                                                    Claim Item
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center col-span-3 text-lg">No items found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
