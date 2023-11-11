import { LoadingOverlay, Stack } from "@mantine/core";
import { PublicationFormHeader } from "./PublicationFormHeader";
import { PublicationForm } from "./PublicationForm";
import { useGetPublicationQuery } from "./publicationsApi";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

export function PublicationEditPage() {
  const params = useParams();
  const publicationId = params.publicationId;
  const {
    data: publication,
    isError,
    isLoading,
  } = useGetPublicationQuery(publicationId ?? skipToken);

  // pass in some handle submit
  return (
    <Stack w="100%">
      <LoadingOverlay visible={isLoading} />
      {isError && "ERROR"}
      {publication && (
        <>
          <PublicationFormHeader />
          <PublicationForm publication={publication} />
        </>
      )}
    </Stack>
  );
}
