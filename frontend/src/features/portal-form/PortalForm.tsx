import { Box, Button, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ContactInfo } from "./ContactInfo";
import { AdInfo } from "./AdInfo";
import { LoginInfo } from "./LoginInfo";

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

export function PortalForm() {
  const [active, setActive] = useState(0);
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const onNext = () => {
    setActive((active) => active + 1);
  };

  const onBack = () => {
    setActive((active) => active - 1);
  };

  const onSubmit = (data: any) => {
    console.log("submitted");
    console.log(data);
  };

  return (
    <Stepper active={active}>
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
          <ContactInfo />
        </Box>
      </Stepper.Step>
      <BackButton onBack={onBack} />
      <NextButton onNext={onNext} />
    </Stepper>
  );
}
