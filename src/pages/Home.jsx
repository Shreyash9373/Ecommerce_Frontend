import React from "react";

import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import FeaturedProducts from "../components/FeaturedProducts";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div>
      <SearchBar className="w-11/12 mx-auto mb-4 lg:hidden" />
      <Hero />
      {/* <LatestCollection /> */}
      <FeaturedProducts />
      {/* <BestSeller /> */}
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
