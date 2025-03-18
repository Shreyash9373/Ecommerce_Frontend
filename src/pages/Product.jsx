import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import useApi from "../hooks/api";
import ErrorComponent from "../components/utils/ErrorComponent";
import Modal from "../components/utils/Modal";

const fetchProductDetails = async (productId) => {
  const api = useApi();
  const res = await api.get(`product/get-product/${productId}`);
  return res.data.data.product;
};

const Product = () => {
  const { productId } = useParams();
  // const { products, addToCart } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState("");
  const [productDetails, setProductDetails] = useState();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const productDetails = await fetchProductDetails(productId);
        setProductDetails(productDetails);
        setSelectedImage(productDetails.images[0]);
      })();
    } catch (error) {
    } finally {
      setProductDetails(null);
    }
  }, []);

  const handleImageModalToggle = () => {
    setImageModalOpen(true);
  };

  return productDetails === undefined ? (
    "a"
  ) : productDetails === null ? (
    <ErrorComponent />
  ) : (
    <div className="mx-auto w-11/12 pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full">
            {/* first 3 images */}
            {productDetails.images.slice(0, 3).map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setSelectedImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  selectedImage === item
                    ? "border-2 border-gray-600 py-2 px-2"
                    : ""
                }`}
                alt="Photo"
              />
            ))}
            {/* modal for other images */}
            {productDetails.images.length > 3 && (
              <button
                onClick={handleImageModalToggle}
                className="btn-outline w-[24%] border sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              >
                +<span>{productDetails.images.length - 3}</span>
              </button>
            )}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={selectedImage} className="w-full h-auto" alt="Photo" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productDetails.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <FaStar className="text-lg text-yellow-500" />
            <FaStar className="text-lg text-yellow-500" />
            <FaStar className="text-lg text-yellow-500" />
            <FaStar className="text-lg text-yellow-500" />
            <FaStar className="text-lg text-yellow-300" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">₹{productDetails.price}</p>
          <p className="text-gray-500 md:w-4/5">{productDetails.description}</p>
          <div className="mt-5 flex flex-col gap-4 mb-8">
            {Object.keys(productDetails.attributes).map((k, index) => (
              <div key={index} className="w-11/12 flex gap-2 lg:w-1/2">
                <p className="w-1/2 font-semibold text-lg">{k}</p>
                <p className="w-1/2 font-light text-lg">
                  {productDetails.attributes[k]}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => addToCart(productDetails._id, size)}
            // className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
            className="btn-fill"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>Guaranteed 100% Authentic – Shop with Confidence!</p>
            <p>Enjoy Cash on Delivery – Pay at Your Doorstep!</p>
            <p>
              Hassle-Free Returns & Exchanges – 10 Days, No Questions Asked!
            </p>
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
          <p>
            Elevate your style with our meticulously crafted Trendify quality
            products. Designed with a perfect balance of elegance and
            practicality, these Trendify quality products made from premium
            materials that ensure both durability and comfort.
          </p>
          <p>
            Whether you're dressing up for a special occasion or adding a touch
            of sophistication to your everyday look, the Trendify quality
            products offer unparalleled versatility. Its timeless design,
            coupled with a flawless fit, makes it a must-have addition to any
            wardrobe. Don’t miss out on the chance to own a piece that combines
            both form and function—experience the difference today.
          </p>
        </div>
      </div>
      {/* Display Related Products */}
      {/* <RelatedProducts
        category={productDetails.category}
        subCategory={productDetails.subCategory}
      /> */}

      {/* Image modal */}
      <Modal
        className="rounded-lg"
        open={imageModalOpen}
        onCancel={(e) => setImageModalOpen(false)}
      >
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {productDetails.images.slice(3).map((image, index) => (
            <img
              src={image}
              key={index}
              onClick={() => {
                setSelectedImage(image);
                setImageModalOpen(false);
              }}
              className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                selectedImage === image
                  ? "border-2 border-gray-600 py-2 px-2"
                  : ""
              }`}
              alt="Photo"
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Product;
