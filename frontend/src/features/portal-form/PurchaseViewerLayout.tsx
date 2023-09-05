import {
  Button,
  Container,
  Divider,
  Flex,
  Paper,
  Stack,
  Text,
  Title,
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
  IconArrowBigRight,
  IconArrowBigRightLines,
  IconArrowBigRightLinesFilled,
} from "@tabler/icons-react";

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
  const monthlyCost = getInputProps("target_monthly_spend").value;
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
          <Text size="lg">Estimated Reach</Text>
          <Text fw={600} size="lg" color="brandBlue">
            80,000
          </Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text size="lg">Impact Score</Text>
          <Text size="lg" fw={600} color="brandBlue">
            9.5 / 10
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
