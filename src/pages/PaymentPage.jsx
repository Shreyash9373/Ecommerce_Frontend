import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaMoneyBillAlt, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const selectedPayment = watch("paymentMethod");

  const onSubmit = (data) => {
    if (!data.paymentMethod) {
      return toast.error("Please select a payment method");
    }

    localStorage.setItem("selectedPaymentMethod", data.paymentMethod);
    navigate("/confirmOrder");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-all">
          <input
            type="radio"
            value="COD"
            {...register("paymentMethod")}
            className="accent-green-600"
          />
          <FaMoneyBillAlt className="text-xl text-green-700" />
          <span>Cash on Delivery (COD)</span>
        </label>

        <label className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-all">
          <input
            type="radio"
            value="UPI"
            {...register("paymentMethod")}
            className="accent-green-600"
          />
          <FaMobileAlt className="text-xl text-green-700" />
          <span>UPI Payment (Pay & Submit Screenshot)</span>
        </label>

        {selectedPayment === "UPI" && (
          <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-md text-sm text-yellow-800">
            <strong>Note:</strong> You'll be shown a UPI QR code after placing your order. You must
            complete the payment using your UPI app and upload a screenshot of the payment as proof.
          </div>
        )}

        <button
          type="submit"
          className="mt-4 btn-fill transition"
        >
          Continue to Order Confirmation
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
