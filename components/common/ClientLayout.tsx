import React from "react";
import Header from "./Header";
import SideBar from "./sideBar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar />
      <div className="relative flex flex-col w-full">
        <Header />
        <div className="grow container mx-auto p-3 md:p-5">{children}</div>
      </div>
    </div>
  );
};

export default ClientLayout;
