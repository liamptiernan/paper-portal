import {
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";

import { BackButton, NextButton } from "../Controls";
import { IconInfoCircle } from "@tabler/icons-react";
import { CartSummary } from "./CartSummary";
import { useGetPublicationQuery } from "../../publisher-dashboard/publications/publicationsApi";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAllSelectedAdOfferings } from "../fields/budget/hooks";

function ImpactScore() {
  const { selectedAd } = useAllSelectedAdOfferings();

  return (
    <Flex justify={"space-between"}>
      <Group style={{ gap: ".1rem" }}>
        <Text size="lg">Impact Score</Text>
        <Tooltip
          multiline
          width={250}
          label="How impactful your ad will be, relative to others in the publication"
        >
          <IconInfoCircle color="gray" />
        </Tooltip>
      </Group>
      {selectedAd !== null ? (
        <Text size="lg" fw={600} color="brandBlue">
          {selectedAd.impact_score * 100}%
        </Text>
      ) : null}
    </Flex>
  );
}

export function SummaryViewer({
  styles,
  onBack,
  onNext,
  isSubmit,
}: {
  styles: React.CSSProperties;
  onBack: () => void;
  onNext: () => void;
  isSubmit: boolean;
}) {
  const params = useParams();
  const publicationId = params.publicationId;
  const { data: publication } = useGetPublicationQuery(
    publicationId ?? skipToken
  );
  // TODO: continue here
  // ad config to disable upload
  // add form validation - in progress
  // fix auth stuff in form
  // work in stripe
  return (
    <Paper
      withBorder
      p="md"
      mt="lg"
      h="100%"
      style={{ flexBasis: "30%", ...styles }}
    >
      <Stack>
        <Title fw={400}>Ad Summary</Title>
        <CartSummary />
        <Divider />
        <Flex justify={"space-between"}>
          <Group style={{ gap: ".1rem" }}>
            <Text size="lg">Estimated Reach</Text>
            <Tooltip
              multiline
              width={250}
              label="An estimate of the amount of people who will receive your ad"
            >
              <IconInfoCircle color="gray" />
            </Tooltip>
          </Group>
          <Text fw={600} size="lg" color="brandBlue">
            {publication?.estimated_reach.toLocaleString()}{" "}
            {publication?.distribution_unit}
          </Text>
        </Flex>
        <ImpactScore />
        <Divider />
        <NextButton onNext={onNext} isSubmit={isSubmit} />
        <BackButton onBack={onBack} />
      </Stack>
    </Paper>
  );
}
