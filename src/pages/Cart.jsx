import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import image1 from "../assets/p_img32.png";
import image2 from "../assets/p_img1.png";
const Cart = () => {
  // Dummy product data
  const dummyProducts = [
    {
      _id: "1",
      name: "Floral Print Wrap Dress",
      category: "WOMEN",
      price: 20.5,
      image: image2, // Replace with actual image URL
      color: "Blue",
      size: 42,
    },
    {
      _id: "2",
      name: "Casual Cotton T-Shirt",
      category: "MEN",
      price: 30.5,
      image: image1, // Replace with actual image URL
      color: "Cream",
      size: 40,
    },
  ];

  // Dummy cart data
  const [cartItems, setCartItems] = useState({
    "1": { "42": 2 },
    "2": { "40": 1 },
  });

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const isCartEmpty = cartData.length === 0;

  // Calculate subtotal and total
  const cartSubtotal = cartData.reduce((total, item) => {
    const product = dummyProducts.find((product) => product._id === item._id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const discount = 4.0;
  const cartTotal = cartSubtotal - discount;

  // Function to update quantity
  const updateQuantity = (productId, size, newQuantity) => {
    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      if (newQuantity > 0) {
        updatedCart[productId] = { ...updatedCart[productId], [size]: newQuantity };
      } else {
        delete updatedCart[productId][size];
        if (Object.keys(updatedCart[productId]).length === 0) {
          delete updatedCart[productId];
        }
      }
      return updatedCart;
    });
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          {!isCartEmpty ? (
            <>
              {/* Table Headers */}
              <div className="hidden sm:grid grid-cols-4 text-gray-600 font-medium pb-3 border-b">
                <p className="col-span-2">Product</p>
                <p className="text-center">Quantity</p>
                <p className="text-right">Total Price</p>
              </div>

              {cartData.map((item, index) => {
                const productData = dummyProducts.find((product) => product._id === item._id);

                return (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3 sm:gap-6 py-4 border-b"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4 col-span-2">
                      <img
                        className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-md"
                        src={productData.image}
                        alt={productData.name}
                      />
                      <div>
                        <p className="text-sm text-gray-500">{productData.category}</p>
                        <p className="font-medium text-gray-800 sm:text-base">{productData.name}</p>
                        <p className="text-gray-500 text-sm">Color: {productData.color}</p>
                        <p className="text-gray-500 text-sm">Size: {productData.size}</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        ₹{productData.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center">
                      <button
                        className="px-2 sm:px-3 py-1 border rounded-l bg-gray-200 text-sm"
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-8 sm:w-10 text-center border-t border-b text-sm"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="px-2 sm:px-3 py-1 border rounded-r bg-gray-200 text-sm"
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between sm:justify-end items-center">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      ₹{((productData.price * item.quantity)).toFixed(2)}
                      </p>
                      <MdDelete
                        className="text-lg text-gray-500 cursor-pointer hover:text-red-500 ml-4"
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-gray-500 text-center py-6">Your cart is empty.</p>
          )}
        </div>

        {/* Cart Summary */}
        {!isCartEmpty && (
          <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Cart Total</h3>
            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <p>Cart Subtotal</p>
              <p>₹{cartSubtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <p>Discount</p>
              <p className="text-red-500">- ₹{discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 text-base border-t pt-2">
              <p>Total</p>
              <p>₹{cartTotal.toFixed(2)}</p>
            </div>
            <button className="w-full mt-4 btn-fill">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
