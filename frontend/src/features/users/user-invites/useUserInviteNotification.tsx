import { notifications } from "@mantine/notifications";
import { useGetInvitesByUserQuery } from "../usersApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setAccountModalOpen } from "../../../app/globalSlice";
import { ActionButton } from "../../../components/Actions";
import { IconMail } from "@tabler/icons-react";

export function useUserInviteNotify() {
  const { data: userInvites, isLoading } = useGetInvitesByUserQuery();

  function NotificationMessage() {
    const dispatch = useAppDispatch();
    const openAccountModal = () => {
      dispatch(setAccountModalOpen(true));
    };
    return (
      <ActionButton
        variant="subtle"
        compact
        onClick={openAccountModal}
        size="xs"
      >
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
        icon: <IconMail size={"1.25rem"} />,
      });
    }
  }, [userInvites, isLoading]);
}
