import { notifications } from "@mantine/notifications";
import { useGetInvitesByUserQuery } from "../usersApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setAccountModalOpen } from "../../../app/globalSlice";
import { ActionButton } from "../../../components/Actions";

export function useUserInviteNotify() {
  // fetch pending invites
  const { data: userInvites, isLoading } = useGetInvitesByUserQuery();

  function NotificationMessage() {
    const dispatch = useAppDispatch();
    const openAccountModal = () => {
      dispatch(setAccountModalOpen(true));
    };
    return (
      <ActionButton variant="subtle" compact onClick={openAccountModal}>
        View Invite
      </ActionButton>
    );
  }

  useEffect(() => {
    if (!userInvites || isLoading) return;
    if (userInvites.count > 0) {
      notifications.show({
        title: "You have been invited to join an organization",
        message: <NotificationMessage />,
        autoClose: false,
        color: "brandYellow",
      });
    }
  }, [userInvites, isLoading]);
  // return them
  // display notification if there are any
  return userInvites;
}
