import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { PrimaryButton } from "../../components/Actions";
import { PublicationsTable } from "./PublicationsTable";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PublicationFormModal } from "./PublicationForm";
import { useAppDispatch } from "../../app/hooks";
import { openPublicationForm } from "./publisherSlice";

export function PublisherDashboard() {
  const dispatch = useAppDispatch();
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
        <PrimaryButton onClick={() => dispatch(openPublicationForm())}>
          Create
        </PrimaryButton>
      </Flex>
      <PublicationsTable />
      <PublicationFormModal />
    </Container>
  );
}

export const AuthPublisherDashboard =
  withAuthenticationRequired(PublisherDashboard);
