import { Project } from "@/types/common";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from "../libs/Button";

type Props = {
  onDeleteProject: (id: string) => void;
  loadingDelete: string;
  project: Project;
};

const SingleProjectPresenter = ({
  project,
  onDeleteProject,
  loadingDelete,
}: Props) => {
  return (
    <tr>
      <td>{project.name}</td>
      <td>{project.description}</td>
      <td>{project.status}</td>
      <td>{project.user.name}</td>
      <td className="flex justify-center gap-1">
        <Link href={`/project-management/update-project/${project._id}`}>
          <Button>
            <FaRegEdit />
          </Button>
        </Link>
        <Button
          variant="error"
          onClick={() => onDeleteProject(project._id)}
          loading={loadingDelete === project._id}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default SingleProjectPresenter;
