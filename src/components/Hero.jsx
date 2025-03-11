import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  { name: "Electronics", img: assets.image1 },
  { name: "Clothes", img: assets.image2 },
  { name: "Furniture", img: assets.image3 },
  { name: "Accessories", img: assets.image4 },
];

const Hero = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200, // Scroll left or right
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col border  p-5 border-gray-400 sm:flex-row">
      {/* Hero left side */}
      <div className="flex items-center justify-center w-full py-10 sm:w-1/2 sm:py-0">
        <div className="text-[#414141]">

          <h1 className="text-3xl leading-relaxed sm:py-3 lg:text-5xl prata-regular">
            Products That We Sell
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Scrollable Categories with Buttons */}
      <div className="relative w-full sm:w-1/2">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {categories.map((category, index) => (
            <div key={index} className="min-w-[150px] sm:min-w-[200px]">
              <img
                className="w-full rounded-lg"
                src={category.img}
                alt={category.name}
              />
              <p className="text-center mt-2 font-medium">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Hero;
