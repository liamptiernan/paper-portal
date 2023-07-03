import { Box, Button, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ContactInfo } from "./ContactInfo";
import { AdInfo } from "./AdInfo";

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

  const onSubmit = (data: any) => {
    console.log("submitted");
    console.log(data);
  };

  return (
    <Stepper active={active}>
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
      <Button type="submit">Next</Button>
    </Stepper>
  );
}
