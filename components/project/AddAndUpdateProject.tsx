"use client";
import { useAppSelector } from "@/hooks/redux";
import { IProjectSchema, projectSchema } from "@/schema/project.chema";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/store/features/project";
import { Project } from "@/types/common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import OutlinedInput from "../libs/OutlinedInput";
import OutlinedTextArea from "../libs/OutlinedTextArea";

const AddAndUpdateProject = ({ data }: { data?: Project }) => {
  const { user } = useAppSelector((state) => state.user);
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProjectSchema>({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      status: data?.status || "ACTIVE",
    },
  });

  async function onSubmit(payload: IProjectSchema) {
    try {
      if (data) {
        await updateProject({ id: data._id, data: payload }).unwrap();
      } else {
        await createProject({ ...payload, createdBy: user?._id }).unwrap();
      }
      toast.success("Project created successfully");
      router.push("/project-management");
    } catch (error: any) {
      toast.error(error.data?.message);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <OutlinedInput
          label="Project name"
          placeholder="Enter project name"
          {...register("name")}
          error={errors.name?.message}
        />
        <OutlinedTextArea
          label="Project description"
          placeholder="Enter project description"
          {...register("description")}
          error={errors.description?.message}
        />

        <Button loading={isCreating || isUpdating} type="submit">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default AddAndUpdateProject;
