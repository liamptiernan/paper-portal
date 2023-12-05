import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { PrimaryButton } from "../../components/Actions";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "./usersApi";
import { useTryToast } from "../../hooks/useTryToast";
import { UsersTable } from "./UsersTable";
import { UserEditModal } from "./UserEditModal";

export function UsersDashboard() {
  const navigate = useNavigate();
  const toast = useTryToast(null, {
    title: "Error creating publication",
  });

  const { data: userRes, isLoading: fetchIsLoading } = useGetAllUsersQuery();

  const handleInviteUser = useCallback(async () => {
    try {
      // TODO: onclick, pop form
      // on submit, create new user invite
      // TODO: implement isErrorWithMessage stuff to handle errors
      // const newUser = { name: "New Publication" };
      await toast(async () => {
        // const createdPublication = await createPublication(
        //   newPublication
        // ).unwrap();
        console.log("invite");
        navigate(`/edit`);
      });
    } catch (e) {
      console.error(e);
    }
  }, [navigate, toast]);

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
        <PrimaryButton
          onClick={handleInviteUser}
          // loading={createIsLoading}
        >
          Invite
        </PrimaryButton>
      </Flex>
      <UsersTable users={userRes?.data} isLoading={fetchIsLoading} />
      <UserEditModal />
    </Container>
  );
}
