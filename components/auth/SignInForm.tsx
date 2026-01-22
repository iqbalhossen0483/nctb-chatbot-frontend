"use client";
import Button from "@/components/libs/Button";
import OutlinedInput from "@/components/libs/OutlinedInput";
import { ILoginSchema, loginSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
import Typography from "../libs/Typography";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginSchema) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <OutlinedInput
        label="Email address"
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

      <Typography color="error">{error}</Typography>
      {/* Sign In Button */}
      <Button loading={loading} type="submit" className="w-full mt-5">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
