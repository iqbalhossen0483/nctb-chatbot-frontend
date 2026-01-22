"use client";

import LoadingIndicator from "@/components/libs/LoadingIndicator";
import ProjectPresenter from "@/components/project/ProjectPresenter";
import { useGetAllProjectsQuery } from "@/store/features/project";
import { Project } from "@/types/common";
import { useState } from "react";

const Projects = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllProjectsQuery({ page });

  const projects: Project[] = data?.data || [];
  const totalPage = data?.meta?.last_page ?? 1;

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <ProjectPresenter
      projects={projects}
      page={page}
      setPage={setPage}
      totalPage={totalPage}
    />
  );
};

export default Projects;
