import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import Loader from "./utils/Loader";
import useApi from "../hooks/api";

const fetchFeaturedProducts = async () => {
  const api = useApi();
  const res = await api.get("product/get-approvedProducts");
  return res.data.data;
};

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState();

  console.log(featuredProducts);

  useEffect(() => {
    (async () => {
      const fProducts = await fetchFeaturedProducts();
      // console.log(fProducts);
      setFeaturedProducts(fProducts);
    })();
  }, []);

  return (
    <div className="py-4 md:py-6 lg:py-8">
      {/* heading */}
      <h1 className="text-3xl text-center">Featured Products</h1>
      {/* products */}
      {featuredProducts ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FeaturedProducts;
