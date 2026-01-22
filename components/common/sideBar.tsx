"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useResponsive from "@/hooks/useResponsive";
import { useLogOutMutation } from "@/store/features/auth";
import { toggleSideBar } from "@/store/slices/settings";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FaRProject, FaUsers } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { ImHome } from "react-icons/im";
import { IoIosLogOut, IoMdMenu } from "react-icons/io";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import { USER_ROLE } from "../user/UpdateUserRoleModal";
import NavLink from "./NavLink";

export type Menu = {
  name: string;
  path: string;
  icon: React.ReactNode;
  access: USER_ROLE[];
};

const SideBar = () => {
  const { showSidebar } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.user);
  const [logout, { isLoading }] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const route = usePathname();
  const isMd = useResponsive("down", "md");

  const menus: Menu[] = [
    {
      name: "Dashboard",
      path: "/",
      icon: <ImHome className="text-xl" />,
      access: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.STAFF],
    },
    {
      name: "User management",
      path: "/user-management",
      icon: <FaUsers className="text-xl" />,
      access: [USER_ROLE.ADMIN],
    },
    {
      name: "Project management",
      path: "/project-management",
      icon: <FaRProject className="text-xl" />,
      access: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.STAFF],
    },
  ];

  useEffect(() => {
    if (isMd) {
      dispatch(toggleSideBar(false));
    }
  }, [dispatch, isMd]);

  async function handleLogout() {
    try {
      await logout(undefined);
      await signOut();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <aside
      className={clsx(
        "bg-card h-screen px-3 py-2 overflow-hidden transition-all duration-300 ease-in-out relative",
        // Desktop
        "md:relative md:translate-x-0",
        showSidebar ? "md:w-80" : "md:w-21.25",

        // Mobile
        "fixed top-0 left-0 z-50 md:z-auto",
        isMd
          ? showSidebar
            ? "w-72 translate-x-0"
            : "w-72 -translate-x-full"
          : "",
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "flex items-center pb-5",
          { "justify-center": !showSidebar },
          { "justify-between": showSidebar },
        )}
      >
        {showSidebar && (
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={80}
            className="transition-opacity duration-300"
          />
        )}

        <button
          className="cursor-pointer text-3xl dark:text-white"
          onClick={() => dispatch(toggleSideBar(!showSidebar))}
        >
          {showSidebar ? <HiMenuAlt3 /> : <IoMdMenu />}
        </button>
      </div>

      {/* Menu */}
      <div className={clsx("flex flex-col gap-1")}>
        {menus.map((menu, index) => {
          if (user && menu.access.includes(user.role)) {
            return (
              <NavLink
                key={index}
                menu={menu}
                route={route}
                collapsed={!showSidebar}
              />
            );
          } else return null;
        })}
      </div>

      <div className="absolute bottom-5 right-5 left-5">
        <Button
          loading={isLoading}
          onClick={handleLogout}
          className="w-full justify-start gap-4 dark:text-white items-center bg-red-400 hover:bg-red-500"
        >
          <div>
            <IoIosLogOut className="text-xl" />
          </div>
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default SideBar;
