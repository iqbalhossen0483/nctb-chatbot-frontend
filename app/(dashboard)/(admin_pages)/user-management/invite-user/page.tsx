"use client";

import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import DropdownMenus from "@/components/libs/DropdownMenus";
import OutlinedInput from "@/components/libs/OutlinedInput";
import Typography from "@/components/libs/Typography";
import { userRoleOptions } from "@/components/user/UpdateUserRoleModal";
import { IInviteSchema, inviteSchema } from "@/schema/auth.schema";
import { isFetchBaseQueryError } from "@/store/baseQuery";
import { useSendInvitationMutation } from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export enum USER_ROLE {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

const Page = () => {
  const [inviteUser, { isLoading, error }] = useSendInvitationMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IInviteSchema>({
    resolver: yupResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: USER_ROLE.STAFF,
    },
  });

  async function onSubmit(data: IInviteSchema) {
    try {
      await inviteUser(data).unwrap();
      toast.success("Invitation sent successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="space-y-5">
      <Typography variant="h3">Invite user</Typography>

      <Card>
        <OutlinedInput
          label="Email address"
          placeholder="Enter the email"
          {...register("email")}
          error={errors.email?.message}
        />

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

        <Typography color="error">
          {isFetchBaseQueryError(error) && error.data.message}
        </Typography>
        <Button
          loading={isLoading}
          className="ml-auto"
          onClick={handleSubmit(onSubmit)}
        >
          Invite
        </Button>
      </Card>
    </div>
  );
};

export default Page;
