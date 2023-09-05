import { Container, Stepper } from "@mantine/core";
import { useState } from "react";
import { AdPurchase, PersonalAdSelection } from "./types";
import { AdPurchaseFormProvider, useAdPurchaseForm } from "./form-context";
import {
  IconAd2,
  IconAddressBook,
  IconAdjustmentsHorizontal,
  IconBuildingStore,
  IconCashBanknote,
  IconReportAnalytics,
  IconSparkles,
} from "@tabler/icons-react";
import { PurchaseViewerLayout } from "./PurchaseViewerLayout";

export function AdPurchaseForm() {
  const [activeStep, setActiveStep] = useState(0);

  const form = useAdPurchaseForm({
    initialValues: {
      personal_ad: PersonalAdSelection.Designed,
      regions: [],
      advanced_options: false,
      target_ages: [],
      target_genders: [],
      target_publications: [],
    },
    validate: {
      email: (value) => {
        if (!value) {
          return null;
        }
        /^\S+@\S+$/.test(value) ? null : "Invalid email";
      },
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
          <Stepper.Step label="Business" icon={<IconBuildingStore />} />
          <Stepper.Step label="Design" icon={<IconAd2 />} />
          <Stepper.Step
            label="Demographics"
            icon={<IconAdjustmentsHorizontal />}
          />
          <Stepper.Step label="Budget" icon={<IconReportAnalytics />} />
          <Stepper.Step label="Contact" icon={<IconAddressBook />} />
          <Stepper.Step label="Payment" icon={<IconCashBanknote />} />
        </Stepper>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PurchaseViewerLayout
            activeStep={activeStep}
            onNext={onNext}
            onBack={onBack}
          />
        </form>
      </AdPurchaseFormProvider>
    </Container>
  );
}
