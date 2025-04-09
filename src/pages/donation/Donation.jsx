import { useState, useContext } from "react";
import { FaStar, FaDonate, FaHeart, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";

const Donate = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [donation, setDonation] = useState("");
    const axiosPublic = useAxiosPublic();

    const handleSubmitFeedback = () => {
        if (!rating || !feedback) {
            Swal.fire("Error", "Please provide a rating and feedback!", "error");
            return;
        }
        const feedbackData = {
            name: user?.displayName || "Anonymous",
            email: user?.email,
            photo: user?.photoURL,
            rating,
            feedback,
            date: new Date().toLocaleDateString(),
        };
        axiosPublic.post("/feedbacks", feedbackData)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Feedback Submitted",
                        text: "Thank you for your feedback!",
                    });
                    setRating(0);
                    setFeedback("");
                }
            })
            .catch((error) => {
                Swal.fire("Error", "Failed to submit feedback!", "error");

            })
    };

    const handleDonate = async () => {
        if (!donation || isNaN(donation) || donation <= 0) {
            Swal.fire("Error", "Please enter a valid donation amount!", "error");
            return;
        }

        const payment = {
            name: user?.displayName || "Anonymous",
            email: user?.email,
            amount: donation,
            transactionId: "",
            date: new Date().toLocaleDateString(),
            status: "pending",
        }

        const response = await axios.post("https://retrievify-server.onrender.com/create-payment-method", payment)
        console.log(response);

        if (response.data?.gatewayURL) {
            window.location.replace(response.data.gatewayURL);
        }

    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl rounded-2xl">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                Give Back & Spread Kindness🌍✨
            </h1>

            {/* Feedback Section */}
            <div className="p-6 bg-white shadow-lg rounded-xl mb-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Share Your Experience</h2>

                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/50"}
                        alt="User"
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                    />
                    <p className="text-lg font-medium">{user?.displayName || "Anonymous User"}</p>
                </div>

                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            className={`text-3xl cursor-pointer transition duration-300 ${(hover || rating) >= star ? "text-yellow-500 scale-110" : "text-gray-300"
                                }`}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                <textarea
                    className="textarea textarea-bordered w-full bg-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />

                <button
                    className="btn bg-[#1a237e] hover:bg-blue-700 text-white w-full mt-4 py-3 rounded-lg transition duration-300"
                    onClick={handleSubmitFeedback}
                >
                    Submit Feedback
                </button>
            </div>

            {/* Donation Section */}
            <div className="p-6 bg-white shadow-lg rounded-xl mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">Make a Donation</h2>
                <p className="text-gray-600 mb-4 text-center">
                    Your donation helps us reward those who return lost items. Every contribution counts! ❤️
                </p>

                <input
                    type="number"
                    className="input input-bordered w-full text-lg p-3 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Enter donation amount (BDT)"
                    value={donation}
                    onChange={(e) => setDonation(e.target.value)}
                />

                <button
                    className="btn bg-green-600 hover:bg-green-700 text-white w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-lg transition duration-300"
                    onClick={handleDonate}
                >
                    <FaDonate /> Donate Now
                </button>
            </div>

            {/* Appreciation Quote */}
            <div className="p-6 bg-gray-100 rounded-lg text-lg font-medium italic text-center shadow-md">
                <FaHeart className="text-red-500 text-4xl mx-auto mb-3 animate-pulse" />
                "The real gift of kindness is that it makes both the giver and the receiver feel richer.
                Thank you for making the world a better place🙏✨"
            </div>
        </div>
    );
};

export default Donate;
