import { Box, Button, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ContactInfo } from "./ContactInfo";
import { AdInfo } from "./AdInfo";
import { LoginInfo } from "./LoginInfo";
import { PaymentInfo } from "./PaymentInfo";
import { AdPurchase } from "./types";
import { AdPurchaseFormProvider, useAdPurchaseForm } from "./form-context";

function NextButton({ onNext }: { onNext: () => void }) {
  return (
    <Button type="submit" onClick={onNext}>
      Next
    </Button>
  );
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <Button type="submit" onClick={onBack}>
      Back
    </Button>
  );
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

  const handleSubmit = (data: any) => {
    console.log("submitted");
    console.log(data);
  };

  return (
    <AdPurchaseFormProvider form={form}>
      <Stepper active={activeStep}>
        <Stepper.Step label="Welcome">
          <LoginInfo />
        </Stepper.Step>
        <Stepper.Step label="Ad Info" description="Tell us about your ad">
          <AdInfo />
        </Stepper.Step>
        <Stepper.Step label="Contact Info">
          <Box>
            <ContactInfo />
          </Box>
        </Stepper.Step>
        <Stepper.Step label="Payment">
          <Box>
            <PaymentInfo />
          </Box>
        </Stepper.Step>
        <BackButton onBack={onBack} />
        <NextButton onNext={onNext} />
      </Stepper>
    </AdPurchaseFormProvider>
  );
}
