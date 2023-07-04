import { Box, TextInput, rem } from "@mantine/core";
import { IconAt, IconBuildingSkyscraper } from "@tabler/icons-react";

export function LoginInfo() {
  return (
    <Box>
      <TextInput
        label="Your Business Name"
        icon={<IconBuildingSkyscraper size={rem(15)} />}
      />
      <TextInput
        label="Your Email"
        type="email"
        icon={<IconAt size={rem(15)} />}
      />
    </Box>
  );
}
