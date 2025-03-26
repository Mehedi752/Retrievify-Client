import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyAddedPosts = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: myAddedPosts = [], refetch } = useQuery({
        queryKey: ['myAddedPosts', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts/myAdded/${user?.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this post?")) {
            await axiosPublic.delete(`/posts/${id}`);
            refetch();
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">My Added Posts</h1>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg shadow-md">
                        <thead className="bg-blue-600 text-white text-lg">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4 text-left">Title</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAddedPosts.map((post, index) => (
                                <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-100 transition-all">
                                    <td className="p-4 text-center">{index + 1}</td>
                                    <td className="p-4 text-left font-semibold">{post.name}</td>
                                    <td className="p-4 text-center">
                                        <span className="bg-gray-500 text-white px-3 py-2 rounded-lg text-sm">
                                            {post.category || "N/A"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">{new Date(post.timestamp).toLocaleDateString()}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 font-medium rounded-lg
                                            ${post.type === 'found' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {post.type}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg shadow-md transition"
                                            onClick={() => console.log("Update Post:", post._id)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg shadow-md transition"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAddedPosts;
