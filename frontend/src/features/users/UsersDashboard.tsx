import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { PrimaryButton } from "../../components/Actions";
import { useCallback } from "react";
import { useGetAllUsersQuery } from "./usersApi";
import { UsersTable } from "./UsersTable";
import { UserEditModal } from "./UserEditModal";
import { UserInviteModal } from "./user-invites/UserInviteModal";
import { useAppDispatch } from "../../app/hooks";
import { setInviteModalOpen } from "./usersSlice";

export function UsersDashboard() {
  const dispatch = useAppDispatch();
  const { data: userRes, isLoading: fetchIsLoading } = useGetAllUsersQuery();

  const handleInviteUser = useCallback(async () => {
    dispatch(setInviteModalOpen(true));
  }, [dispatch]);

  return (
    <Container
      style={{ width: "calc(100vw - 165px)" }}
      size={"85rem"}
      mt={"lg"}
    >
      <Flex justify={"space-between"} align={"baseline"}>
        <Stack spacing={"None"}>
          <Title>User Management</Title>
          <Text>{userRes?.count || "No"} Users</Text>
        </Stack>
        <PrimaryButton onClick={handleInviteUser}>Invite</PrimaryButton>
      </Flex>
      <UsersTable users={userRes?.data} isLoading={fetchIsLoading} />
      <UserEditModal />
      <UserInviteModal />
    </Container>
  );
}
