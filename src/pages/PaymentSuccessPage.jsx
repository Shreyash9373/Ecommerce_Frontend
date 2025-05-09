import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaBoxOpen, FaListAlt } from "react-icons/fa";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-6xl text-green-500" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>

        {/* Order ID */}
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <div className="flex items-center justify-center gap-2">
            <FaBoxOpen className="text-gray-500" />
            <span className="font-medium">Order ID:</span>
            <span className="text-gray-700">{orderId}</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-3">
          {/* <button
            onClick={() => navigate(`/order/details/${orderId}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
          >
            <FaBoxOpen /> View Order Details
          </button> */}
          
          <button
            onClick={() => navigate("/account/orders")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2"
          >
            <FaListAlt /> View All Orders
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          We've sent the order confirmation to your email. You can track your order in the orders section.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;