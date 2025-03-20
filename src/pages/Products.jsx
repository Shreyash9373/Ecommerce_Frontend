import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/api";
import ErrorComponent from "../components/utils/ErrorComponent";
import Loader from "../components/utils/Loader";
import FormInput from "../components/utils/FormInput";

const fetchProducts = async (queryParams, filters) => {
  const api = useApi();
  const res = await api.post(
    `/product/search-products?${queryParams.toString()}`
  );
  return res.data.data.products;
};

// default filter options
const defaultFilters = {
  minPrice: "",
  maxPrice: "",
  priceSort: "high-low",
};

const Products = () => {
  // const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  // const [filterProducts, setFilterProducts] = useState([]);
  // const [category, setCategory] = useState([]);
  // const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const [products, setProducts] = useState();
  const location = useLocation();
  const [filters, setFilters] = useState(defaultFilters);

  const toggleCategory = (e) => {
    // if (category.includes(e.target.value)) {
    //   setCategory((prev) => prev.filter((item) => item !== e.target.value));
    // } else {
    //   setCategory((prev) => [...prev, e.target.value]);
    // }
  };

  const toggleSubCategory = (e) => {
    // if (subCategory.includes(e.target.value)) {
    //   setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    // } else {
    //   setSubCategory((prev) => [...prev, e.target.value]);
    // }
  };

  const sortProduct = () => {
    // let fpCopy = filterProducts.slice();
    // switch (sortType) {
    //   case "low-high":
    //     setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
    //     break;
    //   case "high-low":
    //     setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
    //     break;
    //   default:
    //     applyFilter();
    //     break;
    // }
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const applyFilters = () => {
    (async () => {
      try {
        const products = await fetchProducts(
          new URLSearchParams(location.search),
          filters
        );
        setProducts(products);
      } catch (error) {
        setProducts(null);
      }
    })();
  };

  // useEffect(() => {
  // applyFilter();
  // }, [category, subCategory, search, showSearch]);

  // useEffect(() => {
  //   // sortProduct();
  // }, [sortType]);

  useEffect(() => {
    (async () => {
      try {
        // setQueryParams(new URLSearchParams(location.search));
        const products = await fetchProducts(
          new URLSearchParams(location.search)
        );
        setProducts(products);
      } catch (error) {
        setProducts(null);
      }
    })();
  }, [location.search]);

  return (
    <div className="flex flex-col gap-1 pt-10 p-5 border-t lg:flex-row lg:gap-10">
      {/* Filter Options */}
      <div className="min-w-60 pb-6">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
        >
          OPTIONS
          <IoMdArrowDropdown
            className={`text-lg lg:hidden ${showFilter ? "" : "-rotate-90"}`}
          />
        </p>
        <div
          className={`flex-col gap-8  border border-gray-300 p-5 mb-5 w-11/12 mx-auto ${
            showFilter ? "flex" : "hidden"
          } lg:flex`}
        >
          {/* Price Filters */}
          <div className="flex flex-col gap-2">
            <p className="mb-3 text-sm font-medium">PRICE FILTER</p>
            <div className="w-full flex flex-col gap-4 text-sm font-light text-gray-800">
              <label
                htmlFor="minPrice"
                className="flex justify-between items-center gap-2"
              >
                Min.
                <FormInput
                  id="minPrice"
                  type="tel"
                  className="w-full"
                  placeholder="₹"
                  value={filters.minPrice}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value))
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: e.target.value,
                      }));
                  }}
                />
              </label>
              <label
                htmlFor="maxPrice"
                className="flex justify-between items-center gap-2"
              >
                Max.
                <FormInput
                  id="maxPrice"
                  type="tel"
                  className="w-full"
                  placeholder="₹"
                  value={filters.maxPrice}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value))
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: e.target.value,
                      }));
                  }}
                />
              </label>
            </div>
          </div>
          {/* Sort price */}
          <div className="flex flex-col gap-2">
            <p className="mb-3 text-sm font-medium">SORT BY PRICE</p>
            <div className="w-full flex flex-col gap-4 text-sm font-light text-gray-800">
              <select
                value={filters.priceSort}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, priceSort: e.target.value }))
                }
                className="padding border-2 border-gray-300"
              >
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        {/* Reset & Apply filter */}
        <div className="flex gap-2 justify-center items-center md:flex-row">
          <button
            className={`btn-outline ${
              showFilter ? "block" : "hidden"
            } lg:block`}
            onClick={resetFilters}
          >
            Reset Filters
          </button>
          <button
            className={`btn-fill ${showFilter ? "block" : "hidden"} lg:block`}
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* View Product Items */}
      <div className="flex-1">
        {products?.length > 0 && (
          <div className="text-xl text-gray-600">
            <span className="font-bold text-2xl mr-2">{products.length}</span>
            results found
          </div>
        )}
        {/* Map Products */}
        {products === undefined ? (
          <Loader className="mt-20 text-5xl text-gray-800 flex justify-center items-center w-full" />
        ) : products === null ? (
          <ErrorComponent />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-gray-600 font-light text-3xl text-center">
            No Products found
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
