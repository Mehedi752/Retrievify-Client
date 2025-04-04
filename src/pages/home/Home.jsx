import React from "react";
import Banner from "./Banner";
import FAQSection from "./FAQSection";
import ChooseUs from "./ChooseUs";
import LatestPosts from "./LatestPosts";
import FeaturedFeedback from "./FeaturedFeedback";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestPosts></LatestPosts>
      <FeaturedFeedback></FeaturedFeedback>
      <ChooseUs />
      <FAQSection />
    </div>
  );
};
export default Home;
