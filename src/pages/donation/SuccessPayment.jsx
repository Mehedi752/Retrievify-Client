import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessPaymentModal = () => {
    const navigate = useNavigate();
    const handleOnClose = () => {
        navigate("/donation");
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8 w-96 text-center"
            >
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center"
                >
                    <CheckCircle className="text-green-500" size={60} />
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful!</h2>
                <p className="text-gray-600 mt-2">Thank you for your donation. Your donation is not just a transaction, it’s a reflection of kindness that restores faith in humanity.</p>
                <button
                    className="btn mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                    onClick={handleOnClose}
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default SuccessPaymentModal;
