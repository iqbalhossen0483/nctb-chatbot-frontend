"use client";
import Button from "@/components/libs/Button";
import OutlinedInput from "@/components/libs/OutlinedInput";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";

const SignupForm = () => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (data: any) => {
    console.log("Sign in:", data);
  };

  return (
    <form className="space-y-2">
      <OutlinedInput label="Your name" placeholder="Enter your name" />
      <OutlinedInput
        label="Email address"
        placeholder="Enter your email"
        startIcon={<AiOutlineMail className="text-xl dark:text-gray-500" />}
      />

      <OutlinedInput
        label="Password"
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        startIcon={
          <IoLockClosedOutline className="text-xl dark:text-gray-500" />
        }
        endAdornment={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-3 mr-1"
          >
            {showPassword ? (
              <FiEyeOff className="text-xl dark:text-gray-500" />
            ) : (
              <FiEye className="text-xl dark:text-gray-500" />
            )}
          </button>
        }
      />
      <OutlinedInput
        label="Confirm password"
        placeholder="Re-enter your password"
        type={showPassword ? "text" : "password"}
        startIcon={
          <IoLockClosedOutline className="text-xl dark:text-gray-500" />
        }
        endAdornment={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="mt-3 mr-1"
          >
            {showConfirmPassword ? (
              <FiEyeOff className="text-xl dark:text-gray-500" />
            ) : (
              <FiEye className="text-xl dark:text-gray-500" />
            )}
          </button>
        }
      />

      {/* Sign In Button */}
      <Button onClick={handleSubmit} className="w-full mt-5">
        Confirm Registration
      </Button>
    </form>
  );
};

export default SignupForm;
