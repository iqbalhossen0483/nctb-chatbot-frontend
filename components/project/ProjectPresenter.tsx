import { useAppSelector } from "@/hooks/redux";
import { Project } from "@/types/common";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Pagination from "../libs/Pagination";
import Table from "../libs/Table";
import TableContainer from "../libs/TableContainer";
import TableHead from "../libs/TableHead";
import Typography from "../libs/Typography";
import SingleProjectPresenter from "./SingleProjectPresenter";

type Props = {
  projects: Project[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  onDeleteProject: (id: string) => void;
  loadingDelete: string;
};

const ProjectPresenter = ({
  projects,
  page,
  setPage,
  totalPage,
  onDeleteProject,
  loadingDelete,
}: Props) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="space-y-5">
      <Typography variant="h3">Project management</Typography>
      <Card>
        <div className="flex justify-end">
          <Link href="/project-management/add-project">
            <Button>
              <div>
                <IoMdAdd />
              </div>
              Add Project
            </Button>
          </Link>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <td>Name</td>
                <td>description</td>
                <td>status</td>
                <td>createdBy</td>
                {user?.role === "ADMIN" && <td>Action</td>}
              </tr>
            </TableHead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <SingleProjectPresenter
                    key={project._id}
                    project={project}
                    onDeleteProject={onDeleteProject}
                    loadingDelete={loadingDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No project found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Card>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPage}
      />
    </div>
  );
};

export default ProjectPresenter;
