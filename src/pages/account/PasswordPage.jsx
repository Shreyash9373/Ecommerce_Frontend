import React, { useState } from "react";
import FormInput from "../../components/utils/FormInput";
import Breadcrumbs from "../../components/Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const PasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/update-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      toast.success("Password updated successfully");
      
      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      // Optionally log out user after password change (security best practice)
      // logout();
      
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
      {/* heading */}
      <Breadcrumbs />

      <Breadcrumbs />

      <div className="w-11/12 flex flex-col justify-center lg:[width:var(--lg-element-width)]">
        <h2 className="text-xl font-semibold md:text-2xl">Password</h2>
        <span className="text-gray-600 text-sm">
          Settings and options to change or reset your password
        </span>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} className="w-11/12 flex flex-col gap-8 lg:[width:var(--lg-element-width)]">
        {/* current password */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="currentPassword">
            Current Password
          </label>
          <FormInput
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="rounded-md md:w-full"
            placeholder="Current password"
            required
          />
        </div>
        
        {/* new password */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="newPassword">
            New Password
          </label>
          <FormInput
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="rounded-md md:w-full"
            placeholder="New password"
            required
            minLength="8"
          />
        </div>
        
        {/* confirm password */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <FormInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="rounded-md md:w-full"
            placeholder="Confirm password"
            required
            minLength="8"
          />
        </div>
        
        {/* buttons */}
        <div className="w-10/12 mx-auto flex flex-col justify-between items-center gap-4 padding md:flex-row md:w-2/3 xl:w-1/3">
          <button 
            type="button" 
            onClick={handleReset}
            className="w-full btn-outline"
            disabled={loading}
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

export default PasswordPage;