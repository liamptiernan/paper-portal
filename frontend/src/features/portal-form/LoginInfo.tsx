import { Flex, Stack, Text, TextInput, rem } from "@mantine/core";
import { IconAt, IconBuildingSkyscraper } from "@tabler/icons-react";
import { useAdPurchaseFormContext } from "./form-context";

export function LoginInfo() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Stack spacing="md">
      <Flex gap={"xs"} align={"center"}>
        <Text
          fw={700}
          variant="gradient"
          gradient={{ from: "brandBlue.1", to: "brandBlue.4", deg: 1 }}
        >
          Welcome!
        </Text>
        <Text>
          We'll collect some info about your business and advertising goals, and
          suggest the ad that's best for you.
        </Text>
      </Flex>
      <TextInput
        label="Business Name"
        icon={<IconBuildingSkyscraper size={rem(15)} />}
        {...getInputProps("business_name")}
      />
      <TextInput
        label="Email"
        type="email"
        icon={<IconAt size={rem(15)} />}
        {...getInputProps("email")}
      />
    </Stack>
  );
}
