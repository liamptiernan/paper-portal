import { Box, Select, TextInput } from "@mantine/core";
export function ContactInfo() {
  const options = [
    { value: "ny", label: "NY" },
    { value: "pa", label: "PA" },
  ];
  return (
    <Box>
      <TextInput label="Your Name" />
      <TextInput type="tel" label="Your Phone Number" />
      <TextInput label="Address Line 1" />
      <TextInput label="Address Line 2" />
      <TextInput label="City" />
      <Select data={options} label="State" />
      <TextInput label="Zip" />
    </Box>
  );
}
