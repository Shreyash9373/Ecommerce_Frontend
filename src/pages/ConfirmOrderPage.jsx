import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmOrderPage = () => {
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
    const storedPayment = localStorage.getItem("selectedPaymentMethod");
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));

    if (!storedAddress || !storedPayment || !storedCart?.length) {
      toast.error("Missing order data. Please restart the process.");
      navigate("/cart");
      return;
    }

    setAddress(storedAddress);
    setPaymentMethod(storedPayment);
    setCartItems(storedCart);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const payload = {
        cartItems: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod,
        shippingAddress: address,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/order/place-order`,
        payload,
        { withCredentials: true }
      );
      console.log("Res :", res);

      toast.success("Order placed successfully");

      // Redirect depending on payment method
      if (paymentMethod === "UPI") {
        navigate(`/order/upi-payment/${res.data.data.newOrder._id}`, {
          state: {
            qrImage: res.data.data.qrImage,
            orderId: res.data.data.newOrder._id,
            amount: res.data.data.newOrder.totalAmount,
          }, // assuming backend sends this
        });
      } else {
        navigate(`/payment-success/${res.data.data.newOrder._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        {address && (
          <div className="text-sm text-gray-700">
            {address.street}, {address.city}, {address.state}, {address.zip}, {address.country}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <div className="text-sm text-gray-700">{paymentMethod}</div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Items</h3>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.productId} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default ConfirmOrderPage;
