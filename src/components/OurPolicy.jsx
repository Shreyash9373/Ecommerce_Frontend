import React from "react";
import { assets } from "../assets/assets";
import { FaExchangeAlt } from "react-icons/fa";
import { IoRibbon } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";

const OurPolicy = () => {
  return (
    <div className="flex flex-col justify-around gap-12 py-8 text-xs text-center text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      <div>
        <FaExchangeAlt className="text-5xl m-auto mb-3" />
        <p className="mb-2 font-semibold">Easy Return & Exchange Policy</p>
        <p className="text-gray-400">Easy Returns/exchanges within 10 days.</p>
      </div>
      <div>
        <IoRibbon className="text-5xl m-auto mb-3" />
        <p className="mb-2 font-semibold">Our Quality Policy</p>
        <p className="text-gray-400">Trendify ensures top-quality products.</p>
      </div>
      <div>
        <MdSupportAgent className="text-5xl m-auto mb-3" />
        <p className="mb-2 font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We support via email, phone, or chat.</p>
      </div>
    </div>
  );
};

export default OurPolicy;
