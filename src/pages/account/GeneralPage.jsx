import React from "react";
import FormInput from "../../components/utils/FormInput";

const GeneralPage = () => {
  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 lg:ml-24">
      {/* heading */}
      <div className="w-11/12 flex flex-col justify-center lg:[width:var(--lg-element-width)]">
        <h2 className="text-xl font-semibold md:text-2xl">General</h2>
        <span className="text-gray-600 text-sm">
          Settings and options to change account information
        </span>
      </div>
      {/* form */}
      <div className="w-11/12 pb-10 flex flex-col gap-2 md:gap-4 lg:[width:var(--lg-element-width)]">
        {/* name */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="name">
            Name
          </label>
          <FormInput
            className="rounded-md md:w-full"
            name="name"
            placeholder="New name"
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
            placeholder="New email"
          />
        </div>
        {/* mobile */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="mobile">
            Mobile
          </label>
          <FormInput
            className="rounded-md md:w-full"
            name="mobile"
            placeholder="New mobile"
          />
        </div>
      </div>
      {/* buttons */}
      <div className="w-10/12 mx-auto flex flex-col justify-between items-center gap-4 padding md:flex-row md:w-2/3 xl:w-1/3">
        <button className="w-full btn-outline">Reset</button>
        <button className="w-full btn-fill">Save</button>
      </div>
    </div>
  );
};

export default GeneralPage;
