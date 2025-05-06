import React, { useEffect, useState } from "react";
import FormInput from "../../components/utils/FormInput";
import Breadcrumbs from "../../components/Breadcrumbs";
import useApi from "../../hooks/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const GeneralPage = () => {
  const api = useApi();
  const { user, fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put("user/update-user", formData);
      
      if (response.data?.data) {
        toast.success("Profile updated successfully");
        // Refresh user data
        await fetchUser();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
      {/* heading */}
      <Breadcrumbs />

      <Breadcrumbs />

      <div className="w-11/12 flex flex-col justify-center lg:[width:var(--lg-element-width)]">
        <h2 className="text-xl font-semibold md:text-2xl">General</h2>
        <span className="text-gray-600 text-sm">
          Settings and options to change account information
        </span>
      </div>
      
      {/* form */}
      <form onSubmit={handleSubmit} className="w-11/12 pb-10 flex flex-col gap-2 md:gap-4 lg:[width:var(--lg-element-width)]">
        {/* name */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="name">
            Name
          </label>
          <FormInput
            className="rounded-md md:w-full"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        
        {/* email */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="email">
            Email
          </label>
          <FormInput
            className="rounded-md md:w-full"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </div>
        
        {/* mobile */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="phone">
            Mobile
          </label>
          <FormInput
            className="rounded-md md:w-full"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            required
          />
        </div>
        
        {/* buttons */}
        <div className="w-10/12 mx-auto flex flex-col justify-between items-center gap-4 padding md:flex-row md:w-2/3 xl:w-1/3">
          <button 
            type="button"
            onClick={handleReset}
            className="w-full btn-outline"
          >
            Reset
          </button>
          <button 
            type="submit"
            className="w-full btn-fill"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralPage;