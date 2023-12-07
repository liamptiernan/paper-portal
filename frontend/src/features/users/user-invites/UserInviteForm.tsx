import { useForm } from "@mantine/form";
import { UserRoles, roleOptions } from "../types";
import { useCallback } from "react";
import { PrimaryButton } from "../../../components/Actions";
import { useTryToast } from "../../../hooks/useTryToast";
import { useCreateUserInviteMutation } from "../usersApi";
import { useAppDispatch } from "../../../app/hooks";
import { setInviteModalOpen } from "../usersSlice";
import { MultiSelect, Stack, TextInput } from "@mantine/core";

interface UserInviteFormValues {
  target_email: string;
  target_roles: UserRoles[];
}

export function UserInviteForm() {
  const dispatch = useAppDispatch();
  const [createUserInvite, { isLoading }] = useCreateUserInviteMutation();
  const toast = useTryToast(
    { title: "User Invited" },
    { title: "An error occurred while inviting the user" }
  );

  const form = useForm<UserInviteFormValues>({
    initialValues: {
      target_email: "",
      target_roles: [],
    },
    validate: {
      target_email: (value) => {
        if (!value) {
          return null;
        }
        /^\S+@\S+$/.test(value) ? null : "Invalid email";
      },
    },
  });

  const handleSubmit = useCallback(
    async (values: UserInviteFormValues) => {
      try {
        await toast(createUserInvite(values).unwrap);
        dispatch(setInviteModalOpen(false));
      } catch (e) {
        console.error(e);
      }
    },
    [toast, createUserInvite, dispatch]
  );
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          required
          label="Email"
          {...form.getInputProps("target_email")}
        />
        <MultiSelect
          label="Permissions"
          data={roleOptions}
          {...form.getInputProps("target_roles")}
        />
        <PrimaryButton type="submit" isLoading={isLoading}>
          Invite
        </PrimaryButton>
      </Stack>
    </form>
  );
}
