import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { FaHome, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

import Modal from "../../components/utils/Modal";
import FormInput from "../../components/utils/FormInput";
import Breadcrumbs from "../../components/Breadcrumbs";

const AddressPage = () => {
  const { user, fetchUser } = useAuth();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddr, setEditingAddr] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    isDefault: false,
    type: "home"
  });
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    isDefault: false,
    type: "home"
  });

  useEffect(() => {
    const checkAddresses = async () => {
      if (user && (!user.addresses || user.addresses.length === 0)) {
        console.log('Forcing user data refresh...');
        await fetchUser(true); // Force refresh with addresses
      }
    };
      
  checkAddresses();
}, [user, fetchUser]);
  // Fetch addresses when user changes
  useEffect(() => {
    if (user?._id) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/get-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      
      console.log("User data:", data.user); // Debugging
      
      if (data?.user?.addresses && Array.isArray(data.user.addresses)) {
        setAddresses(data.user.addresses);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      toast.error("Failed to load addresses");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };
  console.log('Current user addresses:', user?.addresses);
  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error("Authentication required");

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/add-address`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      console.log("Add address response:", response.data); // Debugging

      toast.success("Address added successfully");
      setAddModal(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        isDefault: false,
        type: "home"
      });
      fetchUser(); // Refresh user data
    } catch (error) {
      console.error("Add address error:", error);
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error("Authentication required");

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/update-address/${editingAddr._id}`,
        editingAddr,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      console.log("Edit address response:", response.data); // Debugging

      toast.success("Address updated successfully");
      setEditModal(false);
      fetchUser(); // Refresh user data
    } catch (error) {
      console.error("Edit address error:", error);
      toast.error(error.response?.data?.message || "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error("Authentication required");

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/delete-address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      console.log("Delete address response:", response.data); // Debugging

      toast.success("Address deleted successfully");
      fetchUser(); // Refresh user data
    } catch (error) {
      console.error("Delete address error:", error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error("Authentication required");

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/set-default-address/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      console.log("Set default response:", response.data); // Debugging

      toast.success("Default address updated");
      fetchUser(); // Refresh user data
    } catch (error) {
      console.error("Set default address error:", error);
      toast.error(error.response?.data?.message || "Failed to set default address");
    }
  };

  const handleInputChange = (e, isNew) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    if (isNew) {
      setNewAddress(prev => ({ ...prev, [name]: val }));
    } else {
      setEditingAddr(prev => ({ ...prev, [name]: val }));
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return <FaHome className="text-blue-500" />;
      case 'work':
        return <FaBuilding className="text-green-500" />;
      default:
        return <FaMapMarkerAlt className="text-purple-500" />;
    }
  };

  if (loading && addresses.length === 0) {
    return (
      <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
        <Breadcrumbs />
        <div className="w-11/12 mx-auto flex justify-center items-center h-64">
          <p>Loading addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
      {/* heading */}
      <Breadcrumbs />

      <Breadcrumbs />

      <div className="w-11/12 mx-auto flex flex-col justify-center lg:[width:var(--lg-element-width)]">
        <h2 className="text-xl font-semibold md:text-2xl">Address</h2>
        <span className="text-gray-600 text-sm">
          Manage your set of addresses used for shipping.
        </span>
      </div>

      {/* addresses */}
      <div className="w-11/12 mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 md:p-8 2xl:grid-cols-3">
        {/* add address button */}
        <button
          onClick={() => setAddModal(true)}
          className="min-h-[20vh] shadow-xl border border-dashed border-gray-400 text-gray-800 flex flex-col justify-center items-center gap-2 hover:bg-gray-50 transition-colors rounded-lg"
        >
          <IoAdd className="text-2xl text-black" />
          <span className="font-medium">Add New Address</span>
        </button>
        
        {/* address list */}
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div 
              key={addr._id} 
              className={`shadow-xl p-6 border ${addr.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} flex flex-col gap-4 rounded-lg relative`}
            >
              {/* Default badge */}
              {addr.isDefault && (
                <span className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                  Default
                </span>
              )}
              
              {/* Address type and icon */}
              <div className="flex items-center gap-2">
                {getAddressIcon(addr.type)}
                <span className="font-medium capitalize">{addr.type}</span>
              </div>
              
              {/* Address details */}
              <div className="flex flex-col gap-1 text-gray-700">
                <span className="text-sm md:text-base">{addr.street}</span>
                <span className="text-sm md:text-base">{addr.city}, {addr.state}</span>
                <span className="text-sm md:text-base">{addr.country}</span>
                <span className="text-sm md:text-base">ZIP: {addr.zip}</span>
              </div>
              
              {/* Address actions */}
              <div className="flex divide-x divide-gray-300 border-t border-gray-200 pt-3 mt-auto">
                <button
                  onClick={() => {
                    setEditingAddr({ ...addr });
                    setEditModal(true);
                  }}
                  className="px-3 text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleSetDefault(addr._id)}
                  className={`px-3 text-sm ${addr.isDefault ? 'text-gray-400 cursor-default' : 'text-blue-600 hover:text-blue-800'}`}
                  disabled={addr.isDefault}
                >
                  {addr.isDefault ? 'Default' : 'Set Default'}
                </button>
                <button 
                  onClick={() => handleDeleteAddress(addr._id)}
                  className="px-3 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No addresses found. Add your first address!</p>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      <Modal open={addModal} onCancel={() => setAddModal(false)} title="Add New Address">
        <form onSubmit={handleAddAddress} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Address Type */}
            <div className="col-span-full">
              <label className="block mb-1">Address Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="home"
                    checked={newAddress.type === 'home'}
                    onChange={(e) => handleInputChange(e, true)}
                    className="h-4 w-4"
                  />
                  <FaHome /> Home
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="work"
                    checked={newAddress.type === 'work'}
                    onChange={(e) => handleInputChange(e, true)}
                    className="h-4 w-4"
                  />
                  <FaBuilding /> Work
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="other"
                    checked={newAddress.type === 'other'}
                    onChange={(e) => handleInputChange(e, true)}
                    className="h-4 w-4"
                  />
                  <FaMapMarkerAlt /> Other
                </label>
              </div>
            </div>

            {/* Street */}
            <div className="col-span-full">
              <label htmlFor="street">Street Address</label>
              <FormInput 
                name="street"
                value={newAddress.street}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="123 Main St"
                required
              />
            </div>
            
            {/* City */}
            <div className="flex flex-col gap-1">
              <label htmlFor="city">City</label>
              <FormInput 
                name="city"
                value={newAddress.city}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="City"
                required
              />
            </div>
            
            {/* State */}
            <div className="flex flex-col gap-1">
              <label htmlFor="state">State/Province</label>
              <FormInput 
                name="state"
                value={newAddress.state}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="State"
                required
              />
            </div>
            
            {/* Country */}
            <div className="flex flex-col gap-1">
              <label htmlFor="country">Country</label>
              <FormInput 
                name="country"
                value={newAddress.country}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="Country"
                required
              />
            </div>
            
            {/* Zip code */}
            <div className="flex flex-col gap-1">
              <label htmlFor="zip">ZIP/Postal Code</label>
              <FormInput 
                name="zip"
                value={newAddress.zip}
                onChange={(e) => handleInputChange(e, true)}
                placeholder="ZIP Code"
                required
              />
            </div>
            
            {/* Default checkbox */}
            <div className="col-span-full flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={(e) => handleInputChange(e, true)}
                className="h-4 w-4"
              />
              <label htmlFor="isDefault">Set as default shipping address</label>
            </div>
          </div>
          
          {/* Form buttons */}
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={() => setAddModal(false)}
              className="btn-outline flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-fill flex-1"
              disabled={loading}
            >
              {loading ? "Adding..." : "Save Address"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Address Modal */}
      <Modal open={editModal} onCancel={() => setEditModal(false)} title="Edit Address">
        <form onSubmit={handleEditAddress} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Address Type */}
            <div className="col-span-full">
              <label className="block mb-1">Address Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="home"
                    checked={editingAddr.type === 'home'}
                    onChange={(e) => handleInputChange(e, false)}
                    className="h-4 w-4"
                  />
                  <FaHome /> Home
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="work"
                    checked={editingAddr.type === 'work'}
                    onChange={(e) => handleInputChange(e, false)}
                    className="h-4 w-4"
                  />
                  <FaBuilding /> Work
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="other"
                    checked={editingAddr.type === 'other'}
                    onChange={(e) => handleInputChange(e, false)}
                    className="h-4 w-4"
                  />
                  <FaMapMarkerAlt /> Other
                </label>
              </div>
            </div>

            {/* Street */}
            <div className="col-span-full">
              <label htmlFor="street">Street Address</label>
              <FormInput 
                name="street"
                value={editingAddr.street}
                onChange={(e) => handleInputChange(e, false)}
                placeholder="123 Main St"
                required
              />
            </div>
            
            {/* City */}
            <div className="flex flex-col gap-1">
              <label htmlFor="city">City</label>
              <FormInput 
                name="city"
                value={editingAddr.city}
                onChange={(e) => handleInputChange(e, false)}
                placeholder="City"
                required
              />
            </div>
            
            {/* State */}
            <div className="flex flex-col gap-1">
              <label htmlFor="state">State/Province</label>
              <FormInput 
                name="state"
                value={editingAddr.state}
                onChange={(e) => handleInputChange(e, false)}
                placeholder="State"
                required
              />
            </div>
            
            {/* Country */}
            <div className="flex flex-col gap-1">
              <label htmlFor="country">Country</label>
              <FormInput 
                name="country"
                value={editingAddr.country}
                onChange={(e) => handleInputChange(e, false)}
                placeholder="Country"
                required
              />
            </div>
            
            {/* Zip code */}
            <div className="flex flex-col gap-1">
              <label htmlFor="zip">ZIP/Postal Code</label>
              <FormInput 
                name="zip"
                value={editingAddr.zip}
                onChange={(e) => handleInputChange(e, false)}
                placeholder="ZIP Code"
                required
              />
            </div>
            
            {/* Default checkbox */}
            <div className="col-span-full flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={editingAddr.isDefault}
                onChange={(e) => handleInputChange(e, false)}
                className="h-4 w-4"
              />
              <label htmlFor="isDefault">Set as default shipping address</label>
            </div>
          </div>
          
          {/* Form buttons */}
          <div className="flex gap-4">
            <button 
              type="button" 
              onClick={() => setEditModal(false)}
              className="btn-outline flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-fill flex-1"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Address"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddressPage;