"use client";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import { useAppSelector } from "@/hooks/redux";
import { redirect } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return children;
};

export default Layout;
