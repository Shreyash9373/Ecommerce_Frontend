import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import ErrorComponent from "../components/utils/ErrorComponent";
import Loader from "../components/utils/Loader";
import FormInput from "../components/utils/FormInput";

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Filter state
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    priceSort: "high-low",
    selectedCategories: [],
    selectedSubCategories: []
  });

  // Fetch initial data (products and categories)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/categories`
        );
        setCategories(categoriesRes.data.data || []);
        
        // Fetch initial products
        await fetchProducts();
      } catch (error) {
        console.error("Error loading initial data:", error);
        setError("Failed to load initial data");
        toast.error("Failed to load initial data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products with current filters
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      
      // Add filter params
      if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
      if (filters.priceSort) {
        queryParams.set('sortBy', filters.priceSort === 'high-low' ? 'priceDesc' : 'priceAsc');
      }
      if (filters.selectedCategories.length > 0) {
        queryParams.set('category', filters.selectedCategories.join(','));
      }
      if (filters.selectedSubCategories.length > 0) {
        queryParams.set('subCategory', filters.selectedSubCategories.join(','));
      }

      console.log("Fetching products with params:", queryParams.toString());
      
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/search-products?${queryParams.toString()}`
      );
      
      if (res.data && res.data.data && res.data.data.products) {
        setProducts(res.data.data.products);
      } else {
        setProducts([]);
        console.warn("Unexpected response format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data
      });
      setError("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories when category is selected
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (filters.selectedCategories.length > 0) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URI}/api/v1/product/subcategories?categories=${filters.selectedCategories.join(',')}`
          );
          setSubCategories(res.data.data || []);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          setSubCategories([]);
        }
      } else {
        setSubCategories([]);
        setFilters(prev => ({...prev, selectedSubCategories: []}));
      }
    };

    fetchSubCategories();
  }, [filters.selectedCategories]);

  // Apply filters when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce to avoid too many requests
    
    return () => clearTimeout(timer);
  }, [filters]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      priceSort: "high-low",
      selectedCategories: [],
      selectedSubCategories: []
    });
  };

  // Toggle category selection
  const toggleCategory = (category) => {
    setFilters(prev => {
      const newCategories = prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category];
      
      return {...prev, selectedCategories: newCategories};
    });
  };

  // Toggle subcategory selection
  const toggleSubCategory = (subCategory) => {
    setFilters(prev => {
      const newSubCategories = prev.selectedSubCategories.includes(subCategory)
        ? prev.selectedSubCategories.filter(sc => sc !== subCategory)
        : [...prev.selectedSubCategories, subCategory];
      
      return {...prev, selectedSubCategories: newSubCategories};
    });
  };

  if (error) {
    return <ErrorComponent message={error} />;
  }

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
          className={`flex-col gap-8 border border-gray-300 p-5 mb-5 w-11/12 mx-auto ${
            showFilter ? "flex" : "hidden"
          } lg:flex`}
        >
          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filters.selectedCategories.includes(category)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subcategory Filters */}
          {subCategories.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="mb-3 text-sm font-medium">SUB CATEGORIES</p>
              <div className="flex flex-wrap gap-2">
                {subCategories.map(subCategory => (
                  <button
                    key={subCategory}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filters.selectedSubCategories.includes(subCategory)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => toggleSubCategory(subCategory)}
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Filters */}
          <div className="flex flex-col gap-2">
            <p className="mb-3 text-sm font-medium">PRICE FILTER</p>
            <div className="w-full flex flex-col gap-4 text-sm font-light text-gray-800">
              <label className="flex justify-between items-center gap-2">
                Min.
                <FormInput
                  type="tel"
                  placeholder="₹"
                  value={filters.minPrice}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value))
                      setFilters(prev => ({
                        ...prev,
                        minPrice: e.target.value,
                      }));
                  }}
                />
              </label>
              <label className="flex justify-between items-center gap-2">
                Max.
                <FormInput
                  type="tel"
                  placeholder="₹"
                  value={filters.maxPrice}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value))
                      setFilters(prev => ({
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
            <p className="mb-3 text-sm font-medium">SORT BY</p>
            <select
              value={filters.priceSort}
              onChange={(e) =>
                setFilters(prev => ({ ...prev, priceSort: e.target.value }))
              }
              className="p-2 border-2 border-gray-300 rounded"
            >
              <option value="high-low">Price: High to Low</option>
              <option value="low-high">Price: Low to High</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Reset & Apply filter */}
        <div className="flex gap-2 justify-center items-center">
          <button
            className="btn-outline"
            onClick={resetFilters}
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Product Results */}
      <div className="flex-1">
        {loading ? (
          <Loader className="mt-20 text-5xl text-gray-800 flex justify-center items-center w-full" />
        ) : products.length > 0 ? (
          <>
            <div className="text-xl text-gray-600 mb-4">
              <span className="font-bold text-2xl mr-2">{products.length}</span>
              products found
              {(filters.selectedCategories.length > 0 || filters.selectedSubCategories.length > 0) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.selectedCategories.map(cat => (
                    <span key={cat} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                  {filters.selectedSubCategories.map(subCat => (
                    <span key={subCat} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {subCat}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-gray-600 font-light text-3xl text-center">
            No Products found. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;