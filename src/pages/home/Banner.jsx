import React from 'react';
import bannerImg from '../../assets/banner.jpg';
const Banner = () => {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-16 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between">
                {/* Left Content */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                        Lost Something? <br /> Find it or Report it Here!
                    </h1>
                    <p className="text-gray-600 mt-4">
                        A secure and user-friendly platform to help you recover lost belongings efficiently.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4 justify-center md:justify-start">
                        <button className="bg-[#1a237e] hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300">
                            🔍 View All Items
                        </button>
                        <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition duration-300">
                            ➕ Add Lost Item
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="mt-10 md:mt-0">
                    <img
                        src={bannerImg}
                        alt="Lost and Found"
                        className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;