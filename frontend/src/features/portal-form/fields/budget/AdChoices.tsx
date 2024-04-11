import { useParams } from "react-router-dom";
import { Loader, Center, Box, Text } from "@mantine/core";
import { AdChoiceCard } from "./AdChoiceCard";
import { useAvailableAdOfferings } from "./hooks";

function AdChoicesList() {
  const params = useParams();
  const publicationId = params.publicationId;
  const { availableOfferings, isLoading } =
    useAvailableAdOfferings(publicationId);

  if (isLoading) {
    return (
      <Center mt="lg">
        <Loader />
      </Center>
    );
  }
  if (availableOfferings.length === 0) {
    return (
      <Box my="md">
        <Text>No ads available at this budget.</Text>
        <Text>Increase your budget to view more options.</Text>
      </Box>
    );
  }
  return (
    <div>
      {availableOfferings.map((adOffering) => (
        <AdChoiceCard adOffering={adOffering} key={adOffering.id} />
      ))}
    </div>
  );
}

export function AdChoices() {
  return (
    <Box>
      <Text>Select ad options below.</Text>
      <Box
        sx={(theme) => ({
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: theme.colors.gray[3],
          maxHeight: "calc(100vh - 300px)",
          overflow: "auto",
        })}
        px="md"
      >
        <AdChoicesList />
      </Box>
    </Box>
  );
}
