import { Flex, Select, Space, TextInput, Text, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "./form-context";
import { FormSection } from "../../components/FormSection";
export function ContactInfo() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { value: "ny", label: "NY" },
    { value: "pa", label: "PA" },
  ];

  const SectionTitle = (
    <Title fw={400}>
      <Text span inherit>
        Your Contact Info
      </Text>
      <Space h="md" />
      <Text inherit fw={400} fz={"xl"} color="brandDark.2">
        We'll use this to contact you about your ad.
      </Text>
    </Title>
  );

  return (
    <FormSection title={SectionTitle}>
      <TextInput
        label="Your Name"
        size="md"
        required
        {...getInputProps("contact_name")}
      />
      <TextInput
        type="tel"
        label="Phone Number"
        size="md"
        required
        {...getInputProps("contact_phone")}
      />
      <TextInput
        label="Address Line 1"
        size="md"
        required
        {...getInputProps("address_1")}
      />
      <TextInput
        label="Address Line 2"
        size="md"
        {...getInputProps("address_2")}
      />
      <Flex gap={"md"}>
        <TextInput
          label="City"
          size="md"
          required
          {...getInputProps("address_city")}
        />
        <Select
          data={options}
          label="State"
          size="md"
          required
          {...getInputProps("address_state")}
        />
      </Flex>
      <TextInput
        label="Zip"
        size="md"
        required
        {...getInputProps("address_zip")}
      />
    </FormSection>
  );
}
