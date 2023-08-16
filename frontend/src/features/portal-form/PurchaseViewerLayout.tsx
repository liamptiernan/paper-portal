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
import { ReactElement, useState } from "react";
import { CampaignSummary } from "./fields/CampaignGoals";
import { AdDesignQuestions } from "./fields/AdDesignQuestions";
import { DemographicQuestions } from "./fields/DemographicQuestions";
import { SpendSlider } from "./fields/BudgetOptions";
import { ContactInfo } from "./ContactInfo";
import { PaymentInfo } from "./PaymentInfo";

// function FormComponentTransition({ children, isActive }: { children: ReactElement, isActive: boolean }) {
//   return (
//     <Transition
//       mounted={isActive}
//       transition="scale-y"
//       duration={200}
//       onExit={}
//     >
//       {(styles) => <div style={styles}>{children}</div>}
//     </Transition>
//   );
// }

function useTransitionManager() {
  const [isExiting, setIsExiting] = useState(false);

  const onEnter = () => {
    if (isExiting) {
    }
  };

  return;
}

function SummaryViewer({ styles }: { styles: React.CSSProperties }) {
  return (
    <Paper withBorder p="md" h="200px" style={{ flexBasis: "40%", ...styles }}>
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
  return (
    <Container size="xl" mt="lg">
      <Flex justify={"space-between"}>
        <LoginInfo />
        <CampaignSummary />
        <AdDesignQuestions />
        <DemographicQuestions />
        <SpendSlider />
        <ContactInfo />
        <PaymentInfo />
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
