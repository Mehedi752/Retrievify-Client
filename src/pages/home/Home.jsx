import React from "react";
import Banner from "./banner";
import FAQSection from "./FAQSection";
import ChooseUs from "./ChooseUs";
import LatestPosts from './LatestPosts';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestPosts></LatestPosts>
      <FAQSection />
      <ChooseUs />
    </div>
  );
export default Home;
