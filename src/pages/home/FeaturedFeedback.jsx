import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featuredFeedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-12 flex flex-col justify-center items-center">
      <h2 className="text-2xl md:text-4xl mb-6 font-semibold text-center">
        User Feedbacks
      </h2>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1} // Default to 1 slide on small screens
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="w-full text-[##19277b] "
      >
        {featuredFeedbacks.map((feedback) => (
          <SwiperSlide
            key={feedback._id}
            className="bg-[#e6e6e6] p-6 rounded-lg border w-full max-w-md mx-auto"
          >
            <div className="flex flex-col items-center h-80 justify-between">
              <img
                src={feedback.photo}
                alt={feedback.name}
                className="w-16 h-16 border border-gray-400 shadow-2xl rounded-full"
              />
              <div className="flex">
                {[...Array(5)].map((_, index) =>
                  index < feedback.rating ? (
                    <FaStar key={index} className="text-yellow-500 mr-1" />
                  ) : (
                    <FaRegStar key={index} className="text-gray-300 mr-1" />
                  )
                )}
              </div>
              <p className="text-center text-gray-700  italic">"{feedback.feedback}"</p>
              <div className="w-full">
                <p className="text-right text-[#19277b] font-semibold">- {feedback.name}</p>
                <p className="text-right text-sm text-gray-500">{feedback.date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="btn bg-[#19277b] rounded-lg text-white mt-5">
      <Link to="/feedbacks" className="text-center">View all feedbacks</Link>
      </button>
    </div>
  );
};

export default Reviews;
