import {
  Checkbox,
  Flex,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { FormSection } from "../../components/FormSection";
import { useAdPurchaseFormContext } from "./form-context";
import { IconCreditCard } from "@tabler/icons-react";

function CardInfo() {
  const { getInputProps } = useAdPurchaseFormContext();

  return (
    <Paper withBorder p="md">
      <Stack spacing={"md"}>
        <TextInput
          label="Card Number"
          icon={<IconCreditCard size={rem(15)} />}
          size="md"
          required
          {...getInputProps("card_number")}
        />
        <Flex justify={"space-between"}>
          <TextInput
            label="Expiration"
            size="md"
            required
            placeholder="MM/YY"
            {...getInputProps("expiration")}
          />
          <TextInput
            label="CVC"
            size="md"
            required
            placeholder="CVC"
            {...getInputProps("cvc")}
          />
        </Flex>
      </Stack>
    </Paper>
  );
}

function BillingAddress() {
  const { getInputProps } = useAdPurchaseFormContext();
  const disableContact =
    getInputProps("reuse_contact").value &&
    getInputProps("reuse_contact").value === true;
  return (
    <Paper withBorder p="md">
      <Stack spacing={"md"}>
        <Text>Billing Address</Text>
        <Checkbox
          label="Check if same as business contact info"
          size={"md"}
          {...getInputProps("reuse_contact")}
        />
        <Flex justify={"space-between"}>
          <TextInput
            disabled={disableContact}
            label="First Name"
            size="md"
            required
            {...getInputProps("billing_first_name")}
          />
          <TextInput
            disabled={disableContact}
            label="Last Name"
            size="md"
            required
            {...getInputProps("billing_last_name")}
          />
        </Flex>
        <TextInput
          disabled={disableContact}
          label="Street Address"
          size="md"
          required
          {...getInputProps("billing_street_address")}
        />
        <TextInput
          disabled={disableContact}
          label="City"
          size="md"
          required
          {...getInputProps("billing_city")}
        />
        <TextInput
          disabled={disableContact}
          label="State"
          size="md"
          required
          {...getInputProps("billing_state")}
        />
        <TextInput
          disabled={disableContact}
          label="Zip Code"
          size="md"
          required
          {...getInputProps("billing_zip")}
        />
      </Stack>
    </Paper>
  );
}

export function PaymentInfo() {
  return (
    <FormSection title={<Title fw={400}>Payment Info</Title>}>
      <CardInfo />
      <BillingAddress />
    </FormSection>
  );
}
