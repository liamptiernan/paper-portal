import {
  Container,
  Flex,
  Paper,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { LoginInfo } from "./LoginInfo";
import { useState } from "react";
import { CampaignSummary } from "./fields/CampaignGoals";
import { AdDesignQuestions } from "./fields/AdDesignQuestions";
import { DemographicQuestions } from "./fields/DemographicQuestions";
import { SpendSlider } from "./fields/BudgetOptions";
import { ContactInfo } from "./ContactInfo";
import { PaymentInfo } from "./PaymentInfo";

function SummaryViewer({ styles }: { styles: React.CSSProperties }) {
  return (
    <Paper withBorder p="md" style={{ flexBasis: "40%", ...styles }}>
      <Title>Summary</Title>
      <Stack>
        <Flex justify={"space-between"}>
          <Text fw={600}>Estimated Reach:</Text>
          <Text>80,000</Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text fw={600}>Impact Score:</Text>
          <Text>9.5</Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text fw={600} align="left">
            Monthly Cost:
          </Text>
          <Text>$500</Text>
        </Flex>
      </Stack>
    </Paper>
  );
}

export function PurchaseViewerLayout({ activeStep }: { activeStep: number }) {
  const sections = [
    <LoginInfo />,
    <CampaignSummary />,
    <AdDesignQuestions />,
    <DemographicQuestions />,
    <SpendSlider />,
    <ContactInfo />,
    <PaymentInfo />,
  ];

  return (
    <Container size="xl">
      <Flex justify={"space-between"}>
        <Transition
          mounted={activeStep === 0}
          transition="scale-y"
          duration={200}
        >
          {(styles) => <LoginInfo styles={styles} />}
        </Transition>
        <Transition
          mounted={activeStep === 1}
          transition="scale-y"
          duration={200}
        >
          {(styles) => <CampaignSummary styles={styles} />}
        </Transition>
        <Transition
          mounted={activeStep === 2}
          transition="scale-y"
          duration={200}
        >
          {(styles) => <AdDesignQuestions styles={styles} />}
        </Transition>
        <Transition
          mounted={activeStep === 3}
          transition="scale-y"
          duration={200}
        >
          {(styles) => <DemographicQuestions styles={styles} />}
        </Transition>
        <Transition
          mounted={activeStep === 4}
          transition="scale-y"
          duration={200}
        >
          {(styles) => <SpendSlider styles={styles} />}
        </Transition>
        <Transition
          mounted={activeStep === 5}
          transition="scale-y"
          duration={200}
        >
          {(styles) => <ContactInfo styles={styles} />}
        </Transition>
        <Transition
          mounted={activeStep === 6}
          transition="scale-y"
          duration={200}
        >
          {(styles) => <PaymentInfo styles={styles} />}
        </Transition>
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
