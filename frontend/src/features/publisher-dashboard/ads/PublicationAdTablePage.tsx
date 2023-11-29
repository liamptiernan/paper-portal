import { Flex, LoadingOverlay, Stack } from "@mantine/core";
import {
  useCreatePublicationAdOfferingMutation,
  useGetPublicationAdOfferingsQuery,
} from "../publications/publicationsApi";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { AdsTable } from "./AdTable";
import { ActionButton } from "../../../components/Actions";
import { useCallback } from "react";
import { useTryToast } from "../../../hooks/useTryToast";

export function AdTablePage() {
  const navigate = useNavigate();
  const params = useParams();
  const publicationId = params.publicationId;
  const {
    data: offeringsRes,
    isError,
    isLoading,
  } = useGetPublicationAdOfferingsQuery(publicationId ?? skipToken);
  const [createOffering, { isLoading: isCreating }] =
    useCreatePublicationAdOfferingMutation();
  const toast = useTryToast(null, {
    title: "Error creating ad offering",
  });

  const handleCreateOffering = useCallback(async () => {
    try {
      const newOffering = {
        name: "New Ad Unit",
        publication_id: Number(publicationId),
      };
      await toast(async () => {
        const createdOffering = await createOffering(newOffering).unwrap();
        navigate(createdOffering.id.toString());
      });
    } catch (e) {
      console.error(e);
    }
  }, [publicationId, toast, createOffering, navigate]);

  return (
    <Stack maw={"1300px"}>
      <LoadingOverlay visible={isLoading} />
      <Flex justify={"flex-end"} gap={"xl"}>
        <ActionButton onClick={handleCreateOffering} isLoading={isCreating}>
          Create Ad Unit
        </ActionButton>
        <ActionButton>Help</ActionButton>
      </Flex>
      {isError && "ERROR"}
      {offeringsRes && <AdsTable offerings={offeringsRes.data} />}
    </Stack>
  );
}
