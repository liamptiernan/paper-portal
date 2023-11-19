import { Container, Flex, Modal, Stack, Title } from "@mantine/core";
import { accountModalOpen, setAccountModalOpen } from "../app/globalSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useCallback } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
import { ActionButton } from "./Actions";

function ModalBody({
  user,
  isAuthenticated,
}: {
  user: User;
  isAuthenticated: boolean;
}) {
  if (!(user && isAuthenticated)) {
    return <h2>User info not found</h2>;
  }

  return (
    <Stack spacing={"xs"}>
      <Container mb="sm">
        <img src={user.picture} alt={user.name} />
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
      title={<Title>Account Info</Title>}
    >
      <ModalBody user={user} isAuthenticated={isAuthenticated} />
      <Flex justify="center" mt="md">
        <ActionButton onClick={() => logout()}>Log out</ActionButton>
      </Flex>
    </Modal>
  );
}
