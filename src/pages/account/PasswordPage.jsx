import React from "react";
import FormInput from "../../components/utils/FormInput";
import Breadcrumbs from "../../components/Breadcrumbs";

const PasswordPage = () => {
  return (
    <div className="[--lg-element-width:75%] py-[--y-padding] flex flex-col min-h-full gap-8 md:ml-12 lg:ml-24">
      {/* heading */}
      <Breadcrumbs />

      <div className="w-11/12 flex flex-col justify-center lg:[width:var(--lg-element-width)]">
        <h2 className="text-xl font-semibold md:text-2xl">Password</h2>
        <span className="text-gray-600 text-sm">
          Settings and options to change or reset your password
        </span>
      </div>

      {/* form */}
      <div className="w-11/12 flex flex-col gap-8 lg:[width:var(--lg-element-width)]">
        {/* password */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="password">
            Password
          </label>
          <FormInput
            type="password"
            name="password"
            className="rounded-md md:w-full"
            placeholder="New password"
          />
        </div>
        {/* confirm password */}
        <div className="flex flex-col gap-1 md:flex-row">
          <label className="md:padding md:w-1/3" htmlFor="confirm-password">
            Confirm Password
          </label>
          <FormInput
            type="password"
            name="confirm-password"
            className="rounded-md md:w-full"
            placeholder="Confirm password"
          />
        </div>
        {/* buttons */}
        <div className="w-10/12 mx-auto flex flex-col justify-between items-center gap-4 padding md:flex-row md:w-2/3 xl:w-1/3">
          <button className="w-full btn-outline">Reset</button>
          <button className="w-full btn-fill">Save</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
