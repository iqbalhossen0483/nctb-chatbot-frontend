"use client";
import LoadingIndicator from "@/components/libs/LoadingIndicator";
import Typography from "@/components/libs/Typography";
import AddAndUpdateProject from "@/components/project/AddAndUpdateProject";
import { useAppSelector } from "@/hooks/redux";
import { useGetSingleProjectQuery } from "@/store/features/project";
import { Project } from "@/types/common";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const id = useParams().id;
  const { token } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetSingleProjectQuery(id, {
    skip: !token,
  });
  const project: Project = data?.data || {};

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <div className="space-y-5">
      <Typography variant="h3">Update project</Typography>
      <AddAndUpdateProject data={project} />
    </div>
  );
};

export default Page;
