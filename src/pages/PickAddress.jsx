import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const PickAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/user/get-address`, {
          withCredentials: true,
        });
        setAddresses(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleContinue = () => {
    const selectedAddress = addresses.find((addr) => addr._id === selectedAddressId);
    if (!selectedAddress) {
      return toast.error("Please select a shipping address");
    }

    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    navigate("/pickPayment"); // Adjust path as needed
  };

  if (loading) return <p className="p-4">Loading addresses...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Shipping Address</h2>
      {addresses.length === 0 ? (
        <p>No saved addresses found.</p>
      ) : (
        <ul className="space-y-4">
          {addresses.map((address) => (
            <li
              key={address._id}
              onClick={() => setSelectedAddressId(address._id)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedAddressId === address._id
                  ? "border-green-700 bg-green-100"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-600" />
                <div>
                  <p className="font-semibold">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state}, {address.zip}, {address.country}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleContinue}
        className="mt-6 btn-fill transition"
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default PickAddress;
