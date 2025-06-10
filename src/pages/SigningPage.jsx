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

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }
    
    return errors;
  };

  const validateForm = () => {
    if (currentState === "Sign Up") {
      // Check for empty fields
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

      // Validate email format
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }

      // Validate phone number (basic validation)
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error("Please enter a valid phone number (10 digits)");
        return false;
      }

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }

      // Validate password complexity
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        passwordErrors.forEach(error => toast.error(error));
        return false;
      }
    } else {
      // Sign In validation
      if (!formData.email || !formData.password) {
        toast.error("Email and password are required");
        return false;
      }
      
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error("Please enter a valid email address");
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
          setFormData((prev) => ({ 
            ...prev, 
            password: "", 
            confirmPassword: "",
            // Keep other fields for easier sign in
            email: prev.email,
            name: prev.name
          }));
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
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.response) {
        // Handle specific error messages from the backend
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Invalid request data";
        } else if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (error.response.status === 409) {
          errorMessage = "Email already registered";
        } else if (error.response.status === 429) {
          errorMessage = "Too many attempts. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
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
            type="tel"
            placeholder="Phone Number (10 digits)"
            className="w-full rounded-sm"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
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
        placeholder={currentState === "Sign Up" ? "Password (min 8 chars with uppercase, lowercase, number & special char)" : "Password"}
        className="w-full rounded-sm"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={8}
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
          minLength={8}
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
        {currentState === "Sign In" && (
    <button
      type="button"
      onClick={() => navigate("/forgot-password")}
      className="cursor-pointer underline font-semibold hover:text-gray-600"
    >
      Forgot Password?
    </button>
  )}
      </div>
      <button className="btn-fill font-light !px-8" type="submit" disabled={loading}>
        {loading ? "Processing..." : currentState}
      </button>
    </form>
  );
};

export default SigningPage;