import { Flex, Select, Space, Text, TextInput, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "./form-context";
import { FormSection } from "../../components/FormSection";
export function ContactInfo() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { value: "ny", label: "NY" },
    { value: "pa", label: "PA" },
  ];
  return (
    <FormSection title={<Title fw={400}>Your contact info</Title>}>
      <TextInput
        label="Your Name"
        size="md"
        {...getInputProps("contact_name")}
      />
      <TextInput
        type="tel"
        label="Phone Number"
        size="md"
        {...getInputProps("contact_phone")}
      />
      <TextInput
        label="Address Line 1"
        size="md"
        {...getInputProps("address_1")}
      />
      <TextInput
        label="Address Line 2"
        size="md"
        {...getInputProps("address_2")}
      />
      <Flex gap={"md"}>
        <TextInput label="City" size="md" {...getInputProps("address_city")} />
        <Select
          data={options}
          label="State"
          size="md"
          {...getInputProps("address_state")}
        />
      </Flex>
      <TextInput label="Zip" size="md" {...getInputProps("address_zip")} />
    </FormSection>
  );
}
