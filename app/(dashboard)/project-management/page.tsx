"use client";

import LoadingIndicator from "@/components/libs/LoadingIndicator";
import ProjectPresenter from "@/components/project/ProjectPresenter";
import { useAppSelector } from "@/hooks/redux";
import {
  useGetAllProjectsQuery,
  useSoftDeleteProjectMutation,
} from "@/store/features/project";
import { Project } from "@/types/common";
import { useState } from "react";
import { toast } from "react-toastify";

const Projects = () => {
  const [page, setPage] = useState(1);
  const { token } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetAllProjectsQuery(
    { page },
    { skip: !token },
  );
  const [deleteProject] = useSoftDeleteProjectMutation();
  const [loadingDelete, setLoadingDelete] = useState("");

  const projects: Project[] = data?.data || [];
  const totalPage = data?.meta?.last_page ?? 1;

  async function handleDeleteProject(id: string) {
    try {
      setLoadingDelete(id);
      await deleteProject(id).unwrap();
      toast.success("Project deleted successfully");
    } catch (error: any) {
      toast.error(error.data?.message);
    } finally {
      setLoadingDelete("");
    }
  }

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <ProjectPresenter
      projects={projects}
      page={page}
      setPage={setPage}
      totalPage={totalPage}
      onDeleteProject={handleDeleteProject}
      loadingDelete={loadingDelete}
    />
  );
};

export default Projects;
