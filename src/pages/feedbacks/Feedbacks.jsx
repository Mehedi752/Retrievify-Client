import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import FeedbackCard from "./FeedbackCard";


const Feedbacks = () => {
    const axiosPublic = useAxiosPublic();
    const { data: feedbacks = [], refetch } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const res = await axiosPublic.get("/feedbacks");
            return res.data;
        },
    });
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">User Feedbacks</h2>
            <div className="space-y-6">
                {feedbacks.map((item, index) => (
                    <FeedbackCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Feedbacks;
