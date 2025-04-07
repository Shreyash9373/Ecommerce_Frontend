import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

import Modal from "../../components/utils/Modal";
import FormInput from "../../components/utils/FormInput";
import Breadcrumbs from "../../components/Breadcrumbs";

const addrs = [
  {
    street: "A-32 Imaginary Towers, Pimpri",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zipCode: "411044",
  },
  {
    street: "A-32 Imaginary Towers, Pimpri",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zipCode: "411044",
  },
  {
    street: "A-32 Imaginary Towers, Pimpri",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zipCode: "411044",
  },
  {
    street: "A-32 Imaginary Towers, Pimpri",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zipCode: "411044",
  },
];

const AddressPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingAddr, setEditingAddr] = useState({});

  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
      {/* heading */}
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
          onClick={(e) => setAddModal((prev) => !prev)}
          className="min-h-[20vh] shadow-xl border border-dashed border-gray-400 text-gray-800 flex justify-center items-center"
        >
          <IoAdd className="text-xl text-black" />
          <span>Add Address</span>
        </button>
        {/* address */}
        {addrs.map((addr, index) => (
          <div key={index} className="shadow-xl p-4 border border-gray-400 flex flex-col gap-4">
            {/* details */}
            <div className="flex flex-col md:gap-1">
              <span className="text-sm md:text-lg">{addr.street}</span>
              <span className="text-sm md:text-lg">{addr.city}</span>
              <span className="text-sm md:text-lg">{addr.state}</span>
              <span className="text-sm md:text-lg">{addr.country}</span>
              <span className="text-sm md:text-lg">{addr.zipCode}</span>
            </div>
            {/* operations */}
            <div className="flex divide-x divide-gray-400">
              <span
                onClick={(e) =>
                  setEditModal((prev) => {
                    setEditingAddr({
                      ...addr,
                    });
                    return !prev;
                  })
                }
                className="padding underline cursor-pointer hover:text-gray-800"
              >
                Edit
              </span>
              <span className="padding underline cursor-pointer hover:text-gray-800">Remove</span>
            </div>
          </div>
        ))}
      </div>
      {/* add address modal */}
      <Modal open={addModal} onCancel={(e) => setAddModal(false)}>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Street */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">Street</label>
              <FormInput placeholder="Street" />
            </div>
            {/* City */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">City</label>
              <FormInput placeholder="City" />
            </div>
            {/* State */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">State</label>
              <FormInput placeholder="State" />
            </div>
            {/* Country */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">Country</label>
              <FormInput placeholder="Country" />
            </div>
            {/* Zip code */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">Zip code</label>
              <FormInput placeholder="Zip code" />
            </div>
          </div>
          {/* Add Button */}
          <button className="btn-fill">Add address</button>
        </div>
      </Modal>

      {/* edit address modal */}
      <Modal open={editModal} onCancel={(e) => setEditModal(false)}>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Street */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">Street</label>
              <FormInput value={editingAddr.street} placeholder="Street" />
            </div>
            {/* City */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">City</label>
              <FormInput value={editingAddr.city} placeholder="City" />
            </div>
            {/* State */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">State</label>
              <FormInput value={editingAddr.state} placeholder="State" />
            </div>
            {/* Country */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">Country</label>
              <FormInput value={editingAddr.country} placeholder="Country" />
            </div>
            {/* Zip code */}
            <div className="flex flex-col gap-1">
              <label htmlFor="street">Zip code</label>
              <FormInput value={editingAddr.zipCode} placeholder="Zip code" />
            </div>
          </div>
          {/* Add Button */}
          <button className="btn-fill">Add address</button>
        </div>
      </Modal>
    </div>
  );
};

export default AddressPage;
