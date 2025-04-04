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
        <div className="md:w-11/12 mx-auto lg:min-h-[350px] my-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">User Feedbacks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-5 md:mx-0 lg:grid-cols-3 gap-6">
                {feedbacks.map((item, index) => (
                    <FeedbackCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Feedbacks;
