import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const VendorRegistration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log("Form:", data);
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "aadhaarCard" && key !== "panCard") {
        formData.append(key, value);
      }
    });

    if (data.aadhaarCard?.[0]) {
      formData.append("verificationDocuments", data.aadhaarCard[0]);
    }
    if (data.panCard?.[0]) {
      formData.append("verificationDocuments", data.panCard[0]);
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/vendor/register`,
        formData
      );
      console.log("RES: ", response.data.data);

      toast.success("Vendor Registration Request Successful!");

      reset();
    } catch (error) {
      toast.error("Registration Failed! " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register as a Seller</h2>
        <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Full Name *</label>
              <input
                type="text"
                {...register("name", { required: "Full Name is required" })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black outline-none"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Email Address *</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black outline-none"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Password *</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Must be at least 6 characters" },
                })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black outline-none"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone Number is required",
                  pattern: { value: /^\d{10}$/, message: "Invalid phone number format" },
                })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black outline-none"
              />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>

            {/* Store Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Store Name *</label>
              <input
                type="text"
                {...register("storeName", { required: "Store Name is required" })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black outline-none"
              />
              <p className="text-red-500 text-sm">{errors.storeName?.message}</p>
            </div>

            {/* Business Type (Dropdown) */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Business Type *</label>
              <select
                {...register("businessType", { required: "Business Type is required" })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black outline-none"
              >
                <option value="">Select Business Type</option>
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </select>
              <p className="text-red-500 text-sm">{errors.businessType?.message}</p>
            </div>

            {/* Aadhaar Card Upload */}
            {/* <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Aadhaar Card *</label>
            <input
              type="file"
              {...register("aadhaarCard", { required: "Aadhaar Card is required" })}
              className="w-full p-3 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.aadhaarCard?.message}</p>
          </div> */}

            {/* PAN Card Upload */}
            {/* <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">PAN Card *</label>
            <input
              type="file"
              {...register("panCard", { required: "PAN Card is required" })}
              className="w-full p-3 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.panCard?.message}</p>
          </div> */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 btn-fill ${isSubmitting ? "opacity-50" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration;
