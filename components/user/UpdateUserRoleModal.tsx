import DropdownMenus from "@/components/libs/DropdownMenus";
import Modal from "@/components/libs/Modal";
import { useUpdateUserRoleMutation } from "@/store/features/user";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../libs/Button";

export enum USER_ROLE {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

type FormPayload = { role: USER_ROLE };

export const userRoleOptions = [
  { label: "Admin", value: USER_ROLE.ADMIN },
  { label: "Manager", value: USER_ROLE.MANAGER },
  { label: "Staff", value: USER_ROLE.STAFF },
];

const UpdateUserRoleModal = ({ open, setOpen, userId }: Props) => {
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPayload>();

  async function onSubmit(data: FormPayload) {
    try {
      await updateUserRole({ id: userId, role: data.role }).unwrap();
      toast.success("User role updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Update user role"
      className="min-h-2/4"
    >
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <DropdownMenus
            options={userRoleOptions}
            selected={field.value}
            setSelected={field.onChange}
            error={!!errors.role}
          />
        )}
      />

      <Button
        loading={isLoading}
        onClick={handleSubmit(onSubmit)}
        className="mt-5 ml-auto"
      >
        Update
      </Button>
    </Modal>
  );
};

export default UpdateUserRoleModal;
