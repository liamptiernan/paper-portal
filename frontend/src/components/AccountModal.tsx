import {
  Alert,
  Container,
  Flex,
  Image,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { accountModalOpen, setAccountModalOpen } from "../app/globalSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useCallback, useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { ActionButton, PrimaryButton } from "./Actions";
import { IconMail } from "@tabler/icons-react";
import {
  useAcceptUserInviteMutation,
  useDeleteUserInviteMutation,
  useGetInvitesByUserQuery,
} from "../features/users/usersApi";
import { UserInvite } from "../features/users/types";
import { useTryToast } from "../hooks/useTryToast";

function InviteNotificationBody({
  displayDeclineConfirm,
  setDisplayDeclineConfirm,
  invite,
}: {
  displayDeclineConfirm: boolean;
  setDisplayDeclineConfirm: (value: boolean) => void;
  invite: UserInvite;
}) {
  const [acceptUserInvite, { isLoading: acceptIsLoading }] =
    useAcceptUserInviteMutation();
  const [deleteUserInvite, { isLoading: deleteIsLoading }] =
    useDeleteUserInviteMutation();
  const acceptToast = useTryToast(
    { title: `${invite.org_name} joined` },
    { title: "An error occurred while attempting to join the organization" }
  );
  const declineToast = useTryToast(
    { title: `Invite to ${invite.org_name} declined` },
    {
      title:
        "An error occurred while attempting to decline the invite to the organization",
    }
  );
  const handleDecline = () => {
    try {
      declineToast(deleteUserInvite(invite.id).unwrap);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAccept = () => {
    try {
      acceptToast(acceptUserInvite(invite.id).unwrap);
    } catch (e) {
      console.error(e);
    }
  };

  if (displayDeclineConfirm) {
    return (
      <Flex gap={"xs"}>
        <Text>
          Are you sure you want to decline your invite to {invite.org_name}?
        </Text>
        <Stack spacing={"xs"}>
          <ActionButton
            compact
            color="brandRed"
            size="xs"
            loading={deleteIsLoading}
            onClick={handleDecline}
          >
            Yes
          </ActionButton>
          <ActionButton
            compact
            variant="subtle"
            size="xs"
            onClick={() => setDisplayDeclineConfirm(false)}
          >
            Cancel
          </ActionButton>
        </Stack>
      </Flex>
    );
  }
  return (
    <Flex gap={"xs"}>
      <Text> You have been invited to join {invite.org_name}</Text>
      <Stack spacing={"xs"} justify="center">
        <PrimaryButton
          compact
          size="xs"
          loading={acceptIsLoading}
          onClick={handleAccept}
        >
          Accept
        </PrimaryButton>
      </Stack>
    </Flex>
  );
}

function InviteNotification({ invite }: { invite: UserInvite }) {
  const [displayConfirm, setDisplayConfirm] = useState(false);

  return (
    <Alert
      title={`Invite to ${invite.org_name}`}
      icon={<IconMail />}
      withCloseButton
      onClose={() => setDisplayConfirm(true)}
      variant="light"
    >
      <InviteNotificationBody
        invite={invite}
        displayDeclineConfirm={displayConfirm}
        setDisplayDeclineConfirm={setDisplayConfirm}
      />
    </Alert>
  );
}

function ModalBody({
  user,
  isAuthenticated,
}: {
  user: User;
  isAuthenticated: boolean;
}) {
  const { data: userInvites } = useGetInvitesByUserQuery();

  if (!(user && isAuthenticated)) {
    return <h2>User info not found</h2>;
  }

  return (
    <Stack spacing={"xs"}>
      {userInvites &&
        userInvites.data.map((invite) => (
          <InviteNotification key={invite.id} invite={invite} />
        ))}
      <Container mb="sm">
        <Image
          width={200}
          height={200}
          fit="contain"
          src={user.picture}
          alt={user.name}
        />
      </Container>
      <Title order={2} fw="400" color="brandDark" size={"sm"}>
        Nickname
      </Title>
      <Title order={3}>{user.nickname}</Title>
      <Title order={2} fw="400" color="brandDark" size={"sm"}>
        Email
      </Title>
      <Title order={3}>{user.email}</Title>
    </Stack>
  );
}

export function AccountModal() {
  const { user, isAuthenticated, logout } = useAuth0();
  const opened = useAppSelector(accountModalOpen);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(setAccountModalOpen(false));
  }, [dispatch]);

  if (!(user && isAuthenticated)) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={<Text size="1.5rem">Account Info</Text>}
    >
      <ModalBody user={user} isAuthenticated={isAuthenticated} />
      <Flex justify="center" mt="md">
        <ActionButton onClick={() => logout()}>Log out</ActionButton>
      </Flex>
    </Modal>
  );
}
