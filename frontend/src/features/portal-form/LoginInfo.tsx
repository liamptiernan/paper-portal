import { Space, Text, TextInput, Title, rem } from "@mantine/core";
import { IconAt, IconBuildingSkyscraper } from "@tabler/icons-react";
import { useAdPurchaseFormContext } from "./form-context";
import { FormSection } from "../../components/FormSection";

function SectionTitle() {
  return (
    <Title>
      <Text
        span
        inherit
        color="brandBlue"
        // variant="gradient"
        // gradient={{ from: "brandBlue.1", to: "brandBlue.4", deg: 1 }}
      >
        The best way to reach your community, is through local media.
      </Text>
      <Space h="md" />
      <Text inherit fw={400} fz={"xl"}></Text>
      <Space h="md" />
      <Text inherit fw={400} fz={"xl"}>
        We'll collect some info about your business and advertising goals, and
        suggest the ad that's best for you.
      </Text>
    </Title>
  );
}

export function LoginInfo() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <FormSection title={<SectionTitle />}>
      <TextInput
        label="Business Name"
        icon={<IconBuildingSkyscraper size={rem(15)} />}
        size="md"
        required
        {...getInputProps("business_name")}
      />
      <TextInput
        label="Email"
        type="email"
        icon={<IconAt size={rem(15)} />}
        size="md"
        required
        {...getInputProps("email")}
      />
    </FormSection>
  );
}
