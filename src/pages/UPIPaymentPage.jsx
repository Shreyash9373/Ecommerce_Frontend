import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UPIPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { qrImage, orderId, amount } = location.state || {};

  const [ssFile, setSSFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  console.log("Res: ", qrImage, orderId);

  useEffect(() => {
    if (!orderId) {
      toast.error("Order ID not found. Please go back to the order page.");
      navigate("/orders"); // Navigate to orders page if orderId is not found
    }
  }, [orderId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ssFile) {
      toast.error("Please upload payment screenshot");
      return;
    }

    const formData = new FormData();
    formData.append("paymentProof", ssFile); // Adding payment screenshot
    formData.append("orderId", orderId); // Adding orderId
    formData.append("payment", amount || 0); // Adding payment amount (defaults to 0 if not provided)

    try {
      setIsUploading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/order/submit-payment`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("r", response);

      toast.success("Payment proof uploaded successfully");
      navigate(`/payment-success/${orderId}`); // Redirect after successful upload
    } catch (err) {
      toast.error("Failed to upload payment proof");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Scan & Pay via UPI</h2>

      {qrImage && (
        <img
          src={qrImage}
          alt="Scan to pay"
          className="w-64 h-64 object-contain mb-6 border border-gray-300"
        />
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <label className="block">
          <span className="text-gray-700">Upload Payment Screenshot (SS)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSSFile(e.target.files[0])}
            className="mt-1 block w-full"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          {isUploading ? "Uploading..." : "Submit Proof"}
        </button>
      </form>
    </div>
  );
};

export default UPIPaymentPage;
