import React from "react";
import Banner from "./banner";
import FAQSection from "./FAQSection";
import ChooseUs from "./ChooseUs";
import LatestPosts from "./LatestPosts";
import BannerSlider from "./Slider";
import Marque from "./Marque";

const Home = () => {
  return (
    <div>
      <BannerSlider></BannerSlider>
      <Banner></Banner>
      <LatestPosts></LatestPosts>
      <Marque></Marque>
      <FAQSection />
      <ChooseUs />
    </div>
  );
};
export default Home;
