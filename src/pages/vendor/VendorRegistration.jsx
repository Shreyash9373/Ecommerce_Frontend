import React, { useState } from "react";
import { toast } from "react-toastify";
const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    storeName: "",
    businessType: "",
    verificationDocuments: [
      { type: "aadhaarCard", file: null },
      { type: "panCard", file: null },
    ],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      verificationDocuments: prevData.verificationDocuments.map((doc) =>
        doc.type === docType ? { ...doc, file } : doc
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "verificationDocuments") formDataToSend.append(key, value);
    });

    formData.verificationDocuments.forEach((doc) => {
      if (doc.file) formDataToSend.append("verificationDocuments", doc.file);
    });

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/vendor/register",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (response.ok) {
        //alert("Vendor Registration Request Successfully Submitted!");
        toast.success("Vendor Registration Request Successfull", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          storeName: "",
          businessType: "",
          verificationDocuments: [
            { type: "aadhaarCard", file: null },
            { type: "panCard", file: null },
          ],
        });
      } else {
        //alert(result.message || "Registration failed!");
        toast.error("Registraion Failed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
     // alert("Error: " + error.message);
     toast.error("Error - "+ error.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register as a Seller
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "name", type: "text", label: "Full Name" },
              { name: "email", type: "email", label: "Email Address" },
              { name: "password", type: "password", label: "Password" },
              { name: "phone", type: "tel", label: "Phone Number" },
              { name: "storeName", type: "text", label: "Store Name" },
              { name: "businessType", type: "text", label: "Business Type" },
            ].map(({ name, type, label }) => (
              <div key={name} className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">{label}<label className="text-red-600 font-medium mb-1">*</label></label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            ))}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full  p-3 btn-fill"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration;
