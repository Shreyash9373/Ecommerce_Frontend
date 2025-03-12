import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${product._id}`}
    >
      <div className="overflow-hidden">
        <img
          className="transition ease-in-out hover:scale-110"
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
