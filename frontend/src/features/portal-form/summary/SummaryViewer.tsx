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

import { useAdPurchaseFormContext } from "../form-context";
import { BackButton, NextButton } from "../Controls";
import { IconInfoCircle } from "@tabler/icons-react";
import { adInfo } from "../fixtures/adInfo";
import { CartSummary } from "./CartSummary";

function calcReach(radius: number) {
  return (radius ^ 2) * 3.14 * 1000;
}

function calcImpactScore(radius: number, monthlyCost: number) {
  const publications = Math.ceil(radius * 0.03);
  const budget = monthlyCost / publications;
  const correctedBudget = budget >= 10 ? budget : 10;

  let closest: number | undefined;
  let score: number | undefined;
  for (const ad of adInfo) {
    const dist = Math.abs(ad.cost - correctedBudget);
    if (closest === undefined || dist < closest) {
      closest = dist;
      score = ad.impact;
    }
  }
  return score;
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
  const { getInputProps } = useAdPurchaseFormContext();
  const monthlyCost: number = getInputProps("target_monthly_spend").value;
  const radius: number = getInputProps("target_area_radius").value;

  // TODO: continue here
  //   pub should control reach
  // ads should control impact score
  //   ad should control total

  // Then, limit to one ad selected
  // Then update language in ad design
  // Ad dimension and dpi suggestions for upload
  // ad config to disable upload
  const estimatedReach = calcReach(radius);
  const impactScore = calcImpactScore(radius, monthlyCost) || 0.99;
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
            {estimatedReach.toLocaleString()}
          </Text>
        </Flex>
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
          <Text size="lg" fw={600} color="brandBlue">
            {Math.round(impactScore * 100)}
          </Text>
        </Flex>
        <Divider />
        <NextButton onNext={onNext} isSubmit={isSubmit} />
        <BackButton onBack={onBack} />
      </Stack>
    </Paper>
  );
}
