import React, { useState } from "react";
import FormInput from "../components/utils/FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SigningPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleStateToggle = () => {
    setCurrentState(currentState === "Sign Up" ? "Sign In" : "Sign Up");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name, phone } = formData;
    const backendUrl = import.meta.env.VITE_BACKEND_URI;

    try {
      if (currentState === "Sign Up") {
        if (!email || !password || !confirmPassword || !name || !phone) {
          return alert("All fields are required!");
        }
        if (password !== confirmPassword) {
          return alert("Passwords do not match!");
        }

        const res = await axios.post(
          `${backendUrl}/api/v1/user/register`,
          { email, password, name, phone },
          { withCredentials: true }
        );

        if (res.status === 200 || res.status === 201) {
          alert("Registration successful! Please sign in.");
          setCurrentState("Sign In");
        }
      } else {
        const res = await axios.post(
          `${backendUrl}/api/v1/user/login`,
          { email, password },
          { withCredentials: true }
        );

        if (res?.data?.accesstoken || res?.data?.accessToken) {
          setUser(res.data.user);
          alert("Login successful!");
          navigate("/");
        } else {
          alert("Login failed. No token returned.");
        }
      }
    } catch (error) {
      console.error("FULL ERROR", error);
      alert(error.response?.data?.message || error.message || "Something went wrong");
    }
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

      {currentState === "Sign Up" && (
        <>
          <FormInput
            name="name"
            placeholder="Full Name"
            className="w-full rounded-sm"
            value={formData.name}
            onChange={handleChange}
          />
          <FormInput
            name="phone"
            placeholder="Phone Number"
            className="w-full rounded-sm"
            value={formData.phone}
            onChange={handleChange}
          />
        </>
      )}

      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        className="w-full rounded-sm"
        value={formData.email}
        onChange={handleChange}
      />
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        className="w-full rounded-sm"
        value={formData.password}
        onChange={handleChange}
      />

      {currentState === "Sign Up" && (
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full rounded-sm"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      )}

      <div className="flex justify-between w-full mt-[-8px]">
        <span className="flex gap-2">
          {currentState === "Sign In"
            ? "Don't have an account?"
            : "Already have an account!"}
          <p
            onClick={handleStateToggle}
            className="cursor-pointer underline font-semibold hover:text-gray-600"
          >
            {currentState === "Sign In" ? "Sign up" : "Sign in"}
          </p>
        </span>
      </div>
      <button className="btn-fill font-light !px-8" type="submit">
        {currentState}
      </button>
    </form>
  );
};

export default SigningPage;
