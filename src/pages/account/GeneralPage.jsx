import React from "react";
import FormInput from "../../components/utils/FormInput";

const GeneralPage = () => {
  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8">
      {/* heading */}
      <div className="w-11/12 mx-auto flex flex-col justify-center lg:[width:var(--lg-element-width)]">
        <h2 className="text-xl font-semibold md:text-2xl">General</h2>
        <span className="text-gray-600 text-sm">
          Settings and options to change account information
        </span>
      </div>
      {/* form grid */}
      <div className="w-11/12 mx-auto pb-10 grid gap-4 grid-cols-2 lg:[width:var(--lg-element-width)]">
        <label className="padding" htmlFor="name">
          Name
        </label>
        <FormInput className="rounded-md" name="name" placeholder="New name" />
        <label className="padding" htmlFor="email">
          Email
        </label>
        <FormInput
          className="rounded-md"
          name="email"
          placeholder="New email"
        />
        <label className="padding" htmlFor="mobile">
          Mobile
        </label>
        <FormInput
          className="rounded-md"
          name="mobile"
          placeholder="New mobile"
        />
      </div>
      {/* buttons */}
      <div className="w-1/3 mx-auto flex justify-between items-center padding md:w-1/4">
        <button className="w-1/3 btn-outline">Reset</button>
        <button className="w-1/3 btn-fill">Save</button>
      </div>
    </div>
  );
};

export default GeneralPage;
