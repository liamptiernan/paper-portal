import { Container, Stepper } from "@mantine/core";
import { useEffect, useState } from "react";
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

function SubmitView() {
  return (
    <div>
      Thank you for your order! We'll prepare everything needed to reach your
      audience, and send you a confirmation email with details on when and where
      your ad will be published.
    </div>
  );
}

export function AdPurchaseForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Community - Ad Designer";
  }, []);

  const form = useAdPurchaseForm({
    initialValues: {
      personal_ad: PersonalAdSelection.Designed,
      regions: [],
      advanced_options: false,
      target_ages: [1, 100],
      target_genders: [],
      target_publications: [],
      target_area_radius: 50,
      target_area_center: "12202",
      target_monthly_spend: 250,
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
    setActiveStep((active) => (active > 0 ? active - 1 : active));
  };

  const handleSubmit = (
    values: AdPurchase,
    _event: React.FormEvent<HTMLFormElement>
  ) => {
    setHasSubmitted(true);
    console.log("submit");
    console.log(values);
  };

  // TODO: add form validation and routing
  return (
    <Container size="xl">
      {!hasSubmitted && (
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
      )}
      {hasSubmitted && <SubmitView />}
    </Container>
  );
}
