import { Modal, MultiSelect, Text } from "@mantine/core";
import { UserRoles, roleOptions } from "./types";
import { useForm } from "@mantine/form";
import {
  activeEditUser,
  rolesModalOpen,
  setRolesModalOpen,
} from "./usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface PermissionsEditForm {
  roles: UserRoles[];
}

export function UserEditModal() {
  const isOpen = useAppSelector(rolesModalOpen);
  const user = useAppSelector(activeEditUser);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(setRolesModalOpen(false));
  const form = useForm<PermissionsEditForm>({
    initialValues: {
      roles: user?.roles || [],
    },
  });

  const handleSubmit = async (values: PermissionsEditForm) => {
    console.log(values);
  };

  return (
    <Modal opened={isOpen} onClose={handleClose}>
      {user ? (
        <>
          <Text>{user.email}</Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <MultiSelect data={roleOptions} />
          </form>
        </>
      ) : (
        <Text>No user set</Text>
      )}
    </Modal>
  );
}
