"use client";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import UserPresenter from "@/components/user/UserPresenter";
import { useAppSelector } from "@/hooks/redux";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/store/features/user";
import { User } from "@/types/common";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const { token } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetAllUsersQuery({ page }, { skip: !token });
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [loadingStatus, setLoadingStatus] = useState("");

  async function handleUserStatus(user: User) {
    try {
      setLoadingStatus(user._id);
      const updateStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await updateUserStatus({ id: user._id, status: updateStatus }).unwrap();
      toast.success("User status updated successfully");
    } catch (error: any) {
      toast.error(error.data?.message);
    } finally {
      setLoadingStatus("");
    }
  }

  const users: User[] = data?.data || [];
  const totalPage = data?.meta?.last_page ?? 1;

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <UserPresenter
      users={users}
      page={page}
      setPage={setPage}
      onChangeStatus={handleUserStatus}
      loadingStatus={loadingStatus}
      totalPage={totalPage}
    />
  );
};

export default UserManagement;
