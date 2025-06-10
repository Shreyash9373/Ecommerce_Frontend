import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/utils/FormInput";

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm();

  const sendOtp = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/admin/sendOtp`,
        { email }
      );
      setOtpSent(true);
      toast.success("OTP sent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const email = getValues("email");
    const otp = getValues("otp");

    if (!otp || !email) {
      toast.error("Please enter both email and OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/admin/verifyOtp`,
        { email, otp }
      );
      setEmailVerified(true);
      toast.success("Email verified. You may now reset your password.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    if (!emailVerified) {
      toast.error("Please verify your email first.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/reset-password`,
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(resetPassword)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">Reset Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Email + Send OTP */}
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        className="w-full rounded-sm"
        register={register}
        required
        disabled={otpSent}
        error={errors.email}
      />

      {!otpSent && (
        <button
          type="button"
          onClick={sendOtp}
          className="btn-fill font-light !px-8 w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      )}

      {/* OTP + Verify */}
      {otpSent && !emailVerified && (
        <>
          <FormInput
            type="text"
            name="otp"
            placeholder="Enter 6-digit OTP"
            className="w-full rounded-sm"
            register={register}
            required
            maxLength={6}
            error={errors.otp}
          />
          <button
            type="button"
            onClick={verifyOtp}
            className="btn-fill font-light !px-8 w-full"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {/* Password Fields */}
      {emailVerified && (
        <>
          <FormInput
            type="password"
            name="password"
            placeholder="New Password (min 8 chars with uppercase, lowercase, number & special char)"
            className="w-full rounded-sm"
            register={register}
            required
            minLength={8}
            error={errors.password}
            validate={{
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Must include uppercase, lowercase, number & special char"
              }
            }}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full rounded-sm"
            register={register}
            required
            minLength={8}
            error={errors.confirmPassword}
            validate={(value) => 
              value === watch("password") || "Passwords do not match"
            }
          />

          <button
            type="submit"
            className="btn-fill font-light !px-8 w-full"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}

      <div className="text-center w-full">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="cursor-pointer underline font-semibold hover:text-gray-600"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;