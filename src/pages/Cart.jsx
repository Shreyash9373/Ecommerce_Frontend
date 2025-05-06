import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const navigate = useNavigate();
  const { user, loadingUser } = useAuth();

  const delivery_fee = 40;
  const discount = 0;

  useEffect(() => {
    if (!loadingUser && !user) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await api.get("cart/get-Cart");
        if (response.data?.data?.items) {
          setCartItems(response.data.data.items);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchCart();
    }
  }, [user, loadingUser]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      setLoading(true);
      const response = await api.put("cart/update-itemQuantity", {
        productId,
        quantity: newQuantity
      });
      
      if (response.data?.data) {
        setCartItems(prev => prev.map(item => 
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        ));
        toast.success("Cart updated");
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setLoading(true);
      await api.delete("cart/remove-Item", { data: { productId } });
      setCartItems(prev => prev.filter(item => item.productId._id !== productId));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + (item.productId.price * item.quantity),
    0
  );
  const cartTotal = cartSubtotal + delivery_fee - discount;

  if (loading || loadingUser) {
    return <div className="p-8 text-center">Loading cart...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 sm:p-8 bg-transparent min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Your Cart</h2>
          <p className="text-gray-600 mb-6">Please login to view your cart items</p>
          <button
            onClick={() => navigate("/login", { state: { from: "/cart" } })}
            className="btn-fill w-full sm:w-auto"
          >
            Login to Continue
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Shopping Cart</h2>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          {cartItems.length > 0 ? (
            <>
              {/* Table Headers */}
              <div className="hidden sm:grid grid-cols-4 text-gray-600 font-medium pb-3 border-b">
                <p className="col-span-2">Product</p>
                <p className="text-center">Quantity</p>
                <p className="text-right">Total Price</p>
              </div>

              {cartItems.map((item) => {
                const product = item.productId;
                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3 sm:gap-6 py-4 border-b"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4 col-span-2">
                      <img
                        className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-md"
                        src={product.images[0]}
                        alt={product.name}
                      />
                      <div>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="font-medium text-gray-800 sm:text-base">{product.name}</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center">
                      <button
                        className="px-2 sm:px-3 py-1 border rounded-l bg-gray-200 text-sm"
                        onClick={() => handleQuantityChange(product._id, item.quantity - 1)}
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
                        onClick={() => handleQuantityChange(product._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between sm:justify-end items-center">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        ₹{(product.price * item.quantity).toFixed(2)}
                      </p>
                      <MdDelete
                        className="text-lg text-gray-500 cursor-pointer hover:text-red-500 ml-4"
                        onClick={() => handleRemoveItem(product._id)}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button 
                onClick={() => navigate("/")}
                className="btn-fill"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Cart Total</h3>
            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <p>Cart Subtotal</p>
              <p>₹{cartSubtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <p>Delivery Fee</p>
              <p>₹{delivery_fee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600 text-sm mb-2">
              <p>Discount</p>
              <p className="text-red-500">- ₹{discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 text-base border-t pt-2">
              <p>Total</p>
              <p>₹{cartTotal.toFixed(2)}</p>
            </div>
            <button 
              className="w-full mt-4 btn-fill"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;