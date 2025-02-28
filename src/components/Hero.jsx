import React, { useState } from "react";
import { assets } from "../assets/assets";

const categories = [
  { name: "Electronics", image: assets.image1 },
  { name: "Clothes", image: assets.image2 },
  { name: "Furnitures", image: assets.image3 },
];

const Hero = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleNext = () => {
    setActiveCategory((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setActiveCategory(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  return (
    <div className="relative flex flex-col border border-gray-400 sm:flex-row">
      {/* Hero left side */}
      <div className="flex flex-col items-center justify-center w-full py-10 sm:w-1/2 sm:py-0">
        <div className="text-[#414141] text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="text-sm font-medium md:text-base">CATEGORY</p>
          </div>
          <h1 className="text-3xl leading-relaxed sm:py-3 lg:text-5xl prata-regular">
            {categories[activeCategory].name}
          </h1>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="text-sm font-semibold md:text-base">EXPLORE NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero right side - Image Slider */}
      <div className="relative w-full sm:w-1/2 flex justify-center">
        <img
          className="w-full h-auto transition-transform duration-500"
          src={categories[activeCategory].image}
          alt={categories[activeCategory].name}
        />
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Hero;
