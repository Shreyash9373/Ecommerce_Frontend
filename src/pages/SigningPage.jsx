import React, { useState } from "react";
import FormInput from "../components/utils/FormInput";

const SigningPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const handleStateToggle = () => {
    setCurrentState(currentState === "Sign Up" ? "Sign In" : "Sign Up");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {/* Email field */}
      <FormInput
        className="w-full rounded-sm"
        name="email"
        placeholder="Email"
      />
      {/* Password field */}
      <FormInput
        type="password"
        className="w-full rounded-sm"
        name="password"
        placeholder="Password"
      />
      {/* Confirm Password field */}
      {currentState === "Sign Up" && (
        <FormInput
          type="password"
          className="w-full rounded-sm"
          name="confirm-password"
          placeholder="Confirm password"
        />
      )}

      {/* Switch b/w sign up & sign in */}
      <div className="flex justify-between w-full mt-[-8px]">
        <span className="flex gap-2">
          <span>
            {currentState === "Sign In"
              ? "Don't have an account"
              : "Already have an account!"}
          </span>
          <p
            onClick={handleStateToggle}
            className="cursor-pointer underline font-semibold hover:text-gray-600"
          >
            {currentState === "Sign In" ? "Sign up" : "Sign in"}
          </p>
        </span>
        {/* )} */}
      </div>
      <button className="btn-fill font-light !px-8">
        {currentState === "Sign In" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default SigningPage;
