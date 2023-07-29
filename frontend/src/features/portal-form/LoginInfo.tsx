import { Box, Stack, TextInput, rem } from "@mantine/core";
import { IconAt, IconBuildingSkyscraper } from "@tabler/icons-react";
import { useAdPurchaseFormContext } from "./form-context";

export function LoginInfo() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Stack spacing="md">
      <TextInput
        label="Your Business Name"
        icon={<IconBuildingSkyscraper size={rem(15)} />}
        {...getInputProps("business_name")}
      />
      <TextInput
        label="Your Email"
        type="email"
        icon={<IconAt size={rem(15)} />}
        {...getInputProps("email")}
      />
    </Stack>
  );
}
