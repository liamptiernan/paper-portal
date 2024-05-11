import { Box, Button, Flex, Transition } from "@mantine/core";
import { LoginInfo } from "./fields/LoginInfo.tsx";
import { CampaignSummary } from "./fields/CampaignGoals";
import { AdDesignQuestions } from "./fields/design/AdDesignQuestions";
import { DemographicQuestions } from "./fields/DemographicQuestions";
import { BudgetOptions } from "./fields/budget/BudgetOptions";
import { ContactInfo } from "./fields/ContactInfo.tsx";
import {
  IconArrowBigLeft,
  IconArrowBigRightLinesFilled,
} from "@tabler/icons-react";
import { useBorderButtonStyles, usePurchaseViewerStyles } from "./styles";
import { SummaryViewer } from "./summary/SummaryViewer";
import { Checkout } from "./stripe/Checkout.tsx";

function PrevBorderButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  const { classes } = useBorderButtonStyles();
  return (
    <div className={classes.backButton}>
      <Button
        style={{
          height: "calc(100vh - 500px)",
          borderRadius: "400px",
          transition: "300ms",
        }}
        sx={{
          "&[data-disabled]": { opacity: "0" },
        }}
        disabled={disabled}
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
  const { classes } = useBorderButtonStyles();
  return (
    <div className={classes.nextButtonContainer}>
      <Button
        className={classes.nextButton}
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

export function PurchaseViewerLayout({
  activeStep,
  onNext,
  onBack,
}: {
  activeStep: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const { classes } = usePurchaseViewerStyles();

  const steps = [
    <LoginInfo />,
    <Checkout />,
    <CampaignSummary />,
    <BudgetOptions />,
    <AdDesignQuestions />,
    <DemographicQuestions />,
    <ContactInfo />,
  ];
  const isSubmit = steps.length === activeStep + 1;
  return (
    <Box className={classes.viewerContainer}>
      <Flex
        justify={"center"}
        direction={{ base: "column", md: "row" }}
        gap={{ base: "none", md: "sm" }}
      >
        {activeStep <= 1 ? (
          <PrevBorderButton onClick={onBack} disabled={activeStep < 1} />
        ) : null}
        {steps[activeStep]}
        {activeStep <= 1 ? <NextBorderButton onClick={onNext} /> : null}
        <Transition
          mounted={activeStep > 1}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <SummaryViewer
              styles={styles}
              onBack={onBack}
              onNext={onNext}
              isSubmit={isSubmit}
            />
          )}
        </Transition>
      </Flex>
    </Box>
  );
}
