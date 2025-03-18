import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="flex flex-col gap-2 text-gray-700 cursor-pointer hover:underline"
      to={`/product/${product._id}`}
    >
      <div className="grow overflow-hidden">
        <img
          className="h-full object-cover transition ease-in-out duration-300 hover:scale-110"
          src={product.images[0]}
          alt="Product"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{product.name}</p>
      <p className="text-sm font-medium">
        ₹&nbsp;
        {product.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductCard;
