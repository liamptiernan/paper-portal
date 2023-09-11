import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  Transition,
} from "@mantine/core";
import { LoginInfo } from "./LoginInfo";
import { CampaignSummary } from "./fields/CampaignGoals";
import { AdDesignQuestions } from "./fields/AdDesignQuestions";
import { DemographicQuestions } from "./fields/DemographicQuestions";
import { SpendSlider } from "./fields/BudgetOptions";
import { ContactInfo } from "./ContactInfo";
import { PaymentInfo } from "./PaymentInfo";
import { useAdPurchaseFormContext } from "./form-context";
import {
  IconArrowBigLeft,
  IconArrowBigRightLinesFilled,
  IconInfoCircle,
} from "@tabler/icons-react";
import { adInfo } from "./fixtures/adInfo";

function PrevBorderButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      style={{
        height: "calc(100vh - 200px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          height: "calc(100vh - 500px)",
          borderRadius: "400px",
          transition: "300ms",
        }}
        size="xl"
        radius="xl"
        variant="subtle"
        color="brandBlue.3"
        leftIcon={<IconArrowBigLeft />}
        onClick={onClick}
      >
        Back
      </Button>
    </div>
  );
}

function NextBorderButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      style={{
        height: "calc(100vh - 200px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          height: "calc(100vh - 500px)",
          borderRadius: "400px",
          transition: "300ms",
        }}
        size="xl"
        variant="subtle"
        color="brandBlue.3"
        rightIcon={<IconArrowBigRightLinesFilled />}
        onClick={onClick}
      >
        Next
      </Button>
    </div>
  );
}

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

function SummaryViewer({
  styles,
  onBack,
  onNext,
}: {
  styles: React.CSSProperties;
  onBack: () => void;
  onNext: () => void;
}) {
  const { getInputProps } = useAdPurchaseFormContext();
  const monthlyCost: number = getInputProps("target_monthly_spend").value;
  const radius: number = getInputProps("target_area_radius").value;

  const estimatedReach = calcReach(radius);
  const impactScore = calcImpactScore(radius, monthlyCost);
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
        <Divider />
        <Flex justify={"space-between"}>
          <Text size="lg" align="left">
            Monthly Cost
          </Text>
          <Text size="lg">${monthlyCost}</Text>
        </Flex>
        <Divider />
        <Flex justify={"space-between"}>
          <Group style={{ gap: ".1rem" }}>
            <Text size="lg">Estimated Reach</Text>
            <Tooltip
              multiline
              width={250}
              label="An estimate of the amount of people who will receive your ad in your search area"
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
              label="An estimated score, of how impactful your ad will be. 10 being a full leading page, 1 being a classified"
            >
              <IconInfoCircle color="gray" />
            </Tooltip>
          </Group>
          <Text size="lg" fw={600} color="brandBlue">
            {impactScore} / 10
          </Text>
        </Flex>
        <Divider />
        <Button onClick={onNext}>Next</Button>
        <Button variant="light" onClick={onBack}>
          Back
        </Button>
      </Stack>
    </Paper>
  );
}

export function PurchaseViewerLayout({
  activeStep,
  onNext,
  onBack,
}: {
  activeStep: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const steps = [
    <LoginInfo />,
    <CampaignSummary />,
    <AdDesignQuestions />,
    <DemographicQuestions />,
    <SpendSlider />,
    <ContactInfo />,
    <PaymentInfo />,
  ];

  return (
    <Container size="xl" mt="lg">
      <Flex gap={"sm"}>
        {activeStep <= 2 ? <PrevBorderButton onClick={onBack} /> : null}
        {steps[activeStep]}
        {activeStep <= 2 ? <NextBorderButton onClick={onNext} /> : null}
        <Transition
          mounted={activeStep > 2}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <SummaryViewer styles={styles} onBack={onBack} onNext={onNext} />
          )}
        </Transition>
      </Flex>
    </Container>
  );
}
