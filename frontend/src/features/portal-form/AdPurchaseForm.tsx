import { Box, Button, Container, Paper, Stepper } from "@mantine/core";
import { useState } from "react";
import { ContactInfo } from "./ContactInfo";
import { LoginInfo } from "./LoginInfo";
import { PaymentInfo } from "./PaymentInfo";
import { AdPurchase } from "./types";
import { AdPurchaseFormProvider, useAdPurchaseForm } from "./form-context";
import { CampaignSummary } from "./fields/CampaignGoals";
import { AdDesignQuestions } from "./fields/AdDesignQuestions";
import { DemographicQuestions } from "./fields/DemographicQuestions";
import { SpendSlider } from "./fields/BudgetOptions";
import {
  IconAd2,
  IconAddressBook,
  IconAdjustmentsHorizontal,
  IconBuildingStore,
  IconCashBanknote,
  IconReportAnalytics,
  IconSparkles,
} from "@tabler/icons-react";

function NextButton({
  onNext,
  activeStep,
}: {
  onNext: () => void;
  activeStep: number;
}) {
  const isLastStep = activeStep === 10;
  return isLastStep ? (
    <Button type="submit">Submit</Button>
  ) : (
    <Button onClick={onNext}>Next</Button>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return <Button onClick={onBack}>Back</Button>;
}

export function AdPurchaseForm() {
  const [activeStep, setActiveStep] = useState(0);

  const form = useAdPurchaseForm({
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onNext = () => {
    setActiveStep((active) => active + 1);
  };

  const onBack = () => {
    setActiveStep((active) => active - 1);
  };

  const handleSubmit = (
    values: AdPurchase,
    _event: React.FormEvent<HTMLFormElement>
  ) => {};

  // TODO: add form validation and routing
  return (
    <Container size="xl">
      <AdPurchaseFormProvider form={form}>
        <Stepper active={activeStep}>
          <Stepper.Step label="Welcome" icon={<IconSparkles />} />
          <Stepper.Step label="Business" icon={<IconBuildingStore />}>
            <CampaignSummary />
          </Stepper.Step>
          <Stepper.Step label="Design" icon={<IconAd2 />}>
            <AdDesignQuestions />
          </Stepper.Step>
          <Stepper.Step
            label="Demographics"
            icon={<IconAdjustmentsHorizontal />}
          >
            <DemographicQuestions />
          </Stepper.Step>
          <Stepper.Step label="Budget" icon={<IconReportAnalytics />}>
            <SpendSlider />
          </Stepper.Step>
          <Stepper.Step label="Contact" icon={<IconAddressBook />}>
            <Box>
              <ContactInfo />
            </Box>
          </Stepper.Step>
          <Stepper.Step label="Payment" icon={<IconCashBanknote />}>
            <Box>
              <PaymentInfo />
            </Box>
          </Stepper.Step>
          <BackButton onBack={onBack} />
          <NextButton onNext={onNext} activeStep={activeStep} />
        </Stepper>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoginInfo />
        </form>
      </AdPurchaseFormProvider>
    </Container>
  );
}
