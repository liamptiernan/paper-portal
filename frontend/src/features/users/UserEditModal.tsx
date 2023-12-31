import { Modal, MultiSelect, Stack, Text } from "@mantine/core";
import { UserRoles, roleOptions } from "./types";
import { useForm } from "@mantine/form";
import {
  activeEditUser,
  rolesModalOpen,
  setRolesModalOpen,
} from "./usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PrimaryButton } from "../../components/Actions";
import { useCallback, useEffect } from "react";
import { useUpdateUserMutation } from "./usersApi";
import { useTryToast } from "../../hooks/useTryToast";

interface PermissionsEditForm {
  roles: UserRoles[];
}

export function UserEditModal() {
  const isOpen = useAppSelector(rolesModalOpen);
  const user = useAppSelector(activeEditUser);
  const dispatch = useAppDispatch();
  const toast = useTryToast(
    { title: "User Permissions Saved" },
    { title: "An error occurred while saving the user's permissions" }
  );
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const form = useForm<PermissionsEditForm>({
    initialValues: {
      roles: user?.roles || [],
    },
  });

  useEffect(() => {
    form.setValues({
      roles: user?.roles || [],
    });
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = useCallback(
    () => dispatch(setRolesModalOpen(false)),
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (values: PermissionsEditForm) => {
      try {
        if (!user) {
          throw new Error("No user set");
        }
        const newUser = { ...user, roles: values.roles };
        await toast(updateUser(newUser).unwrap);
        handleClose();
      } catch (e) {
        console.error(e);
      }
    },
    [user, toast, updateUser, handleClose]
  );

  return (
    <Modal
      title={
        <Text inherit fw="400" color="brandDark" size={"sm"}>
          Edit Permissions
        </Text>
      }
      opened={isOpen}
      onClose={handleClose}
    >
      {user ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Stack spacing={"xs"} mb="sm">
              <Text fw="400">Email</Text>
              <Text color="brandDark">{user.email}</Text>
            </Stack>
            <Text fw="400">Permissions</Text>
            <MultiSelect
              data={roleOptions}
              dropdownPosition="top"
              maxDropdownHeight={110}
              mb="lg"
              {...form.getInputProps("roles")}
            />
            <PrimaryButton isLoading={isLoading} type="submit">
              Save
            </PrimaryButton>
          </Stack>
        </form>
      ) : (
        <Text>No user set</Text>
      )}
    </Modal>
  );
}
