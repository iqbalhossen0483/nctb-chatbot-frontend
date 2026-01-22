import SignupForm from "@/components/auth/SignupForm";
import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={100}
            className="mx-auto"
          />
          <Typography
            align="center"
            className="text-3xl font-bold text-primary-main mb-2"
          >
            Project Management
          </Typography>
          <Typography align="center" color="gray">
            Confirm your registration
          </Typography>
        </div>

        {/* Sign In Card */}
        <Card>
          <SignupForm />
        </Card>

        {/* Footer */}
        <Typography
          variant="caption"
          align="center"
          className="mt-8 text-gray-500"
        >
          © 2026 Project Management. All rights reserved.
        </Typography>
      </div>
    </div>
  );
}
