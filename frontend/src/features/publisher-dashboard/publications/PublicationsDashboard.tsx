import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { PrimaryButton } from "../../../components/Actions";
import { PublicationsTable } from "./PublicationsTable";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePublicationMutation } from "./publicationsApi";

export function PublicationsDashboard() {
  const [createPublication, { isLoading: createIsLoading }] =
    useCreatePublicationMutation();
  const navigate = useNavigate();
  const handleCreatePublication = useCallback(async () => {
    try {
      // TODO: implement isErrorWithMessage stuff to handle errors
      // Add toast
      const newPublication = { name: "New Publication" };
      const createdPublication = await createPublication(
        newPublication
      ).unwrap();
      navigate(`${createdPublication.id}/edit`);
    } catch (e) {
      console.error(e);
    }
  }, [navigate, createPublication]);

  return (
    <Container
      style={{ width: "calc(100vw - 165px)" }}
      size={"85rem"}
      mt={"lg"}
    >
      <Flex justify={"space-between"} align={"baseline"}>
        <Stack spacing={"None"}>
          <Title>Publications</Title>
          <Text>2 Publications</Text>
        </Stack>
        <PrimaryButton
          onClick={handleCreatePublication}
          loading={createIsLoading}
        >
          Create
        </PrimaryButton>
      </Flex>
      <PublicationsTable />
    </Container>
  );
}

export const AuthPublisherDashboard = withAuthenticationRequired(
  PublicationsDashboard
);
