import { Box, Select, TextInput } from "@mantine/core";
import { useAdPurchaseFormContext } from "./form-context";
export function ContactInfo() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { value: "ny", label: "NY" },
    { value: "pa", label: "PA" },
  ];
  return (
    <Box>
      <TextInput label="Your Name" {...getInputProps("contact_name")} />
      <TextInput
        type="tel"
        label="Your Phone Number"
        {...getInputProps("contact_phone")}
      />
      <TextInput label="Address Line 1" {...getInputProps("address_1")} />
      <TextInput label="Address Line 2" {...getInputProps("address_2")} />
      <TextInput label="City" {...getInputProps("address_city")} />
      <Select
        data={options}
        label="State"
        {...getInputProps("address_state")}
      />
      <TextInput label="Zip" {...getInputProps("address_zip")} />
    </Box>
  );
}
