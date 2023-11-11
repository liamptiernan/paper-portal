import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { PrimaryButton } from "../../../components/Actions";
import { PublicationsTable } from "./PublicationsTable";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreatePublicationMutation,
  useGetAllPublicationsQuery,
} from "./publicationsApi";
import { useTryToast } from "../../../hooks/useTryToast";

export function PublicationsDashboard() {
  const [createPublication, { isLoading: createIsLoading }] =
    useCreatePublicationMutation();
  const navigate = useNavigate();
  const toast = useTryToast(null, {
    title: "Error creating publication",
  });

  const { data: publicationsRes, isLoading: fetchIsLoading } =
    useGetAllPublicationsQuery();

  const handleCreatePublication = useCallback(async () => {
    try {
      // TODO: implement isErrorWithMessage stuff to handle errors
      const newPublication = { name: "New Publication" };
      await toast(async () => {
        const createdPublication = await createPublication(
          newPublication
        ).unwrap();
        navigate(`${createdPublication.id}/edit`);
      });
    } catch (e) {
      console.error(e);
    }
  }, [navigate, createPublication, toast]);

  return (
    <Container
      style={{ width: "calc(100vw - 165px)" }}
      size={"85rem"}
      mt={"lg"}
    >
      <Flex justify={"space-between"} align={"baseline"}>
        <Stack spacing={"None"}>
          <Title>Publications</Title>
          <Text>{publicationsRes?.count || ""} Publications</Text>
        </Stack>
        <PrimaryButton
          onClick={handleCreatePublication}
          loading={createIsLoading}
        >
          Create
        </PrimaryButton>
      </Flex>
      <PublicationsTable
        publications={publicationsRes?.data}
        isLoading={fetchIsLoading}
      />
    </Container>
  );
}

export const AuthPublisherDashboard = withAuthenticationRequired(
  PublicationsDashboard
);
