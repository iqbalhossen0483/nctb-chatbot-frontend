"use client";
import Button from "@/components/libs/Button";
import OutlinedInput from "@/components/libs/OutlinedInput";
import { IRegisterSchema, registerSchema } from "@/schema/auth.schema";
import { useSignUpMutation } from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import Typography from "../libs/Typography";

const SignupForm = () => {
  const params = useSearchParams();
  const accessToken = params.get("accessToken");
  const email = params.get("email");
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [error, setError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterSchema>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: IRegisterSchema) => {
    try {
      const { confirmPassword: _, ...rest } = data;
      await signUp({ ...rest, accessToken }).unwrap();
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setError(error.data?.message);
    }
  };

  return (
    <form className="space-y-2">
      <OutlinedInput
        label="Your name"
        placeholder="Enter your name"
        {...register("name")}
        error={errors.name?.message}
      />
      <OutlinedInput
        label="Email address"
        disabled
        placeholder="Enter your email"
        startIcon={<AiOutlineMail className="text-xl dark:text-gray-500" />}
        {...register("email")}
        error={errors.email?.message}
      />

      <OutlinedInput
        label="Password"
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={errors.password?.message}
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
        type={showConfirmPassword ? "text" : "password"}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
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

      <Typography color="error">{error}</Typography>

      {/* Sign In Button */}
      <Button
        loading={isLoading}
        onClick={handleSubmit(onSubmit)}
        className="w-full mt-5"
      >
        Confirm Registration
      </Button>
    </form>
  );
};

export default SignupForm;
