import ClientLayout from "@/components/common/ClientLayout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <ClientLayout>{children}</ClientLayout>;
};

export default Layout;
