import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import useApi from "../hooks/api";
import ErrorComponent from "../components/utils/ErrorComponent";
import Modal from "../components/utils/Modal";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [productDetails, setProductDetails] = useState();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [loading, setLoading] = useState({
    product: true,
    cart: false
  });
  const [quantity, setQuantity] = useState(1);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`product/get-product/${productId}`);
        const productData = response.data.data.product;
        setProductDetails(productData);
        setSelectedImage(productData.images[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductDetails(null);
      } finally {
        setLoading(prev => ({ ...prev, product: false }));
      }
    };
    fetchProduct();
  }, [productId]);

  const handleImageModalToggle = () => {
    setImageModalOpen(!imageModalOpen);
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem('accessToken')) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    setLoading(prev => ({ ...prev, cart: true }));
    try {
      const response = await api.post("cart/add-Item", {
        productId: productDetails._id,
        quantity: quantity
      });
      
      if (response.data?.data) {
        toast.success("Item added to cart!");
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem('accessToken');
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to add item to cart");
      }
    } finally {
      setLoading(prev => ({ ...prev, cart: false }));
    }
  };

  if (loading.product && !productDetails) {
    return <div className="w-full h-screen flex items-center justify-center">Loading product...</div>;
  }

  if (productDetails === null) {
    return <ErrorComponent message="Product not found" />;
  }

  return (
    <div className="mx-auto w-11/12 pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {productDetails?.images?.slice(0, 3).map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setSelectedImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  selectedImage === item
                    ? "border-2 border-gray-600 py-2 px-2"
                    : ""
                }`}
                alt="Product"
              />
            ))}
            {productDetails?.images?.length > 3 && (
              <button
                onClick={handleImageModalToggle}
                className="btn-outline w-[24%] border sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              >
                +{productDetails.images.length - 3}
              </button>
            )}
          </div>
          <div className="w-full sm:w-[80%]">
            <img 
              src={selectedImage} 
              className="w-full h-auto max-h-[500px] object-contain" 
              alt="Product" 
              onClick={handleImageModalToggle}
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productDetails?.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`text-lg ${i < 4 ? "text-yellow-500" : "text-yellow-300"}`} 
              />
            ))}
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">₹{productDetails?.price}</p>
          <p className="text-gray-500 md:w-4/5">{productDetails?.description}</p>
          
          {/* Quantity Selector */}
          <div className="mt-5">
            <p className="font-semibold">Quantity:</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 border">{quantity}</span>
              <button
                className="px-3 py-1 border rounded bg-gray-200"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {productDetails?.attributes && (
            <div className="mt-5 flex flex-col gap-4 mb-8">
              {Object.entries(productDetails.attributes).map(([key, value], index) => (
                <div key={index} className="w-11/12 flex gap-2 lg:w-1/2">
                  <p className="w-1/2 font-semibold text-lg">{key}</p>
                  <p className="w-1/2 font-light text-lg">{value}</p>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            className="btn-fill w-full sm:w-auto"
            disabled={loading.cart}
          >
            {loading.cart ? "Adding..." : "ADD TO CART"}
          </button>
          
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
            <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
            <p>Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!</p>
          </div>
        </div>
      </div>
      
      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
          <p>{productDetails?.longDescription || productDetails?.description}</p>
        </div>
      </div>
      
      {/* Image modal */}
      <Modal
        open={imageModalOpen}
        onCancel={handleImageModalToggle}
        className="max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {productDetails?.images?.map((image, index) => (
            <img
              src={image}
              key={index}
              onClick={() => {
                setSelectedImage(image);
                setImageModalOpen(false);
              }}
              className="w-full h-auto max-h-64 object-contain cursor-pointer"
              alt={`Product view ${index + 1}`}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Product;