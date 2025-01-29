import { Modal } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useCallback } from "react";
import { inviteModalOpen, setInviteModalOpen } from "../usersSlice";
import { UserInviteForm } from "./UserInviteForm";

export function UserInviteModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(inviteModalOpen);

  const handleClose = useCallback(
    () => dispatch(setInviteModalOpen(false)),
    [dispatch]
  );

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Invite a User to Your Organization"
    >
      <UserInviteForm />
    </Modal>
  );
}
