import {
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

function SummaryViewer({ styles }: { styles: React.CSSProperties }) {
  const { getInputProps } = useAdPurchaseFormContext();
  const monthlyCost = getInputProps("target_monthly_spend").value;
  return (
    <Paper withBorder p="md" h="100%" style={{ flexBasis: "30%", ...styles }}>
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
      </Stack>
    </Paper>
  );
}

export function PurchaseViewerLayout({ activeStep }: { activeStep: number }) {
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
      <Flex justify={"space-between"}>
        {steps[activeStep]}
        <Transition
          mounted={activeStep > 2}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => <SummaryViewer styles={styles} />}
        </Transition>
      </Flex>
    </Container>
  );
}
