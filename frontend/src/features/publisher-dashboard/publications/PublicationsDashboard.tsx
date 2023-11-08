import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { PrimaryButton } from "../../../components/Actions";
import { PublicationsTable } from "./PublicationsTable";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useCreatePublicationMutation } from "./publicationsApi";
import { useCallback } from "react";

export function PublicationsDashboard() {
  const [createPublication] = useCreatePublicationMutation();
  const handleCreatePublication = useCallback(async () => {
    try {
      await createPublication().unwrap;
      // TODO: implement isErrorWithMessage stuff to handle errors
      // Add toast
      // rework this a bit
      // move this mutation to the /create page
      // when you land there, hit that endpoint immediately to get a new publication
      // set vals as initial
    } catch (e) {
      console.error(e);
    }
  }, [createPublication]);
  return (
    <Container
      style={{ width: "calc(100vw - 165px)" }}
      size={"85rem"}
      mt={"lg"}
    >
      <Flex justify={"space-between"} align={"baseline"}>
        <Stack spacing={"None"}>
          <Title>Publications</Title>
          <Text># Publications</Text>
        </Stack>
        <PrimaryButton onClick={handleCreatePublication}>Create</PrimaryButton>
      </Flex>
      <PublicationsTable />
    </Container>
  );
}

export const AuthPublisherDashboard = withAuthenticationRequired(
  PublicationsDashboard
);
