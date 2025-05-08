import React, { useState } from "react";
import FormInput from "../components/utils/FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const SigningPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleStateToggle = () => {
    setCurrentState(currentState === "Sign Up" ? "Sign In" : "Sign Up");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (currentState === "Sign Up") {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phone
      ) {
        toast.error("All fields are required");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }
    } else {
      if (!formData.email || !formData.password) {
        toast.error("Email and password are required");
        return false;
      }
    }
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URI;

    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(`${backendUrl}/api/v1/user/register`, formData, {
          withCredentials: true,
        });

        if (res.status === 200 || res.status === 201) {
          toast.success("Registration successful! Please sign in.");
          setCurrentState("Sign In");
          // Clear password fields after successful registration
          setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
        }
      } else {
        const res = await axios.post(
          `${backendUrl}/api/v1/user/login`,
          { email: formData.email, password: formData.password },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res?.data) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          setUser(res.data.data.user);
          toast.success("Login successful!");
          navigate("/");
        } else {
          throw new Error("No token received");
        }
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
            required
          />
          <FormInput
            name="phone"
            placeholder="Phone Number"
            className="w-full rounded-sm"
            value={formData.phone}
            onChange={handleChange}
            required
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
        required
      />
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        className="w-full rounded-sm"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
      />

      {currentState === "Sign Up" && (
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full rounded-sm"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
        />
      )}

      <div className="flex justify-between w-full mt-[-8px]">
        <span className="flex gap-2">
          {currentState === "Sign In" ? "Don't have an account?" : "Already have an account!"}
          <button
            type="button"
            onClick={handleStateToggle}
            className="cursor-pointer underline font-semibold hover:text-gray-600"
          >
            {currentState === "Sign In" ? "Sign up" : "Sign in"}
          </button>
        </span>
      </div>
      <button className="btn-fill font-light !px-8" type="submit" disabled={loading}>
        {loading ? "Processing..." : currentState}
      </button>
    </form>
  );
};

export default SigningPage;
