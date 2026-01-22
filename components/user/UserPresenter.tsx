import Pagination from "@/components/libs/Pagination";
import { User } from "@/types/common";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Table from "../libs/Table";
import TableContainer from "../libs/TableContainer";
import TableHead from "../libs/TableHead";
import Typography from "../libs/Typography";
import SingleUserPresenter from "./SingleUserPresenter";

type Props = {
  users: User[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onChangeStatus: (user: User) => void;
  loadingStatus: string;
  totalPage: number;
};

const UserPresenter = ({
  users,
  page,
  setPage,
  onChangeStatus,
  loadingStatus,
  totalPage,
}: Props) => {
  return (
    <div className="space-y-5">
      <Typography variant="h3">User management</Typography>
      <Card>
        <div className="flex justify-end">
          <Link href="/user-management/add-user">
            <Button>
              <div>
                <IoMdAdd />
              </div>
              Add user
            </Button>
          </Link>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </TableHead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <SingleUserPresenter
                    key={user._id}
                    user={user}
                    onChangeStatus={onChangeStatus}
                    loadingStatus={loadingStatus}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No user found</td>
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

export default UserPresenter;
