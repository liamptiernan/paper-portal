import { LoadingOverlay, Stack } from "@mantine/core";
import { useGetPublicationAdOfferingQuery } from "../publications/publicationsApi";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { AdOfferingForm } from "./AdForm";

export function AdOfferingEditPage() {
  const params = useParams();
  const adOfferingId = params.offeringId;
  const {
    data: adOffering,
    isError,
    isLoading,
  } = useGetPublicationAdOfferingQuery(adOfferingId ?? skipToken);

  return (
    <Stack w="100%">
      <LoadingOverlay visible={isLoading} />
      {isError && "ERROR"}
      {adOffering && <AdOfferingForm adOffering={adOffering} />}
    </Stack>
  );
}
