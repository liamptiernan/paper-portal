import {
  Checkbox,
  Collapse,
  Flex,
  MultiSelect,
  Paper,
  RangeSlider,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";
import { IconTool } from "@tabler/icons-react";

function Regions() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { value: "greenville", label: "Greenville" },
    { value: "coxsackie", label: "Coxsackie" },
    { value: "albany", label: "Albany" },
  ];
  return (
    <MultiSelect
      label="What regions do you want to target?"
      data={options}
      size="md"
      {...getInputProps("regions")}
    />
  );
}

function AdvancedToggle() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Switch
      label="View advanced options"
      size="md"
      // labelPosition="left"
      {...getInputProps("advanced_options", { type: "checkbox" })}
    />
  );
}

function Section() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { value: "sports", label: "Sports" },
    { value: "news", label: "News" },
    { value: "local_events", label: "Local Events" },
  ];
  return (
    <Select
      label="What section of the paper do you want your ad to appear in?"
      data={options}
      size="md"
      {...getInputProps("target_section")}
    />
  );
}

function Age() {
  const { getInputProps } = useAdPurchaseFormContext();
  const marks = [
    { value: 1, label: 1 },
    { value: 20, label: 20 },
    { value: 40, label: 40 },
    { value: 60, label: 60 },
    { value: 80, label: 80 },
    { value: 100, label: "100+" },
  ];
  return (
    <Stack mb="lg">
      <Text>What's your target age range?</Text>
      <RangeSlider
        marks={marks}
        min={1}
        max={100}
        {...getInputProps("target_ages")}
      />
    </Stack>
  );
}

function Gender() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Checkbox.Group
      label="Gender"
      size="md"
      {...getInputProps("target_genders")}
    >
      <Flex gap={"lg"}>
        <Checkbox label="Male" value="male" />
        <Checkbox label="Female" value="female" />
      </Flex>
    </Checkbox.Group>
  );
}

function Publications() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { value: "greenville_times", label: "Greenville Times" },
    { value: "ravena_herald", label: "Ravena Herald" },
    { value: "albany_courier", label: "Albany Courier" },
  ];
  return (
    <MultiSelect
      label="What publications do you want your ad to appear in?"
      data={options}
      size="md"
      {...getInputProps("target_publications")}
    />
  );
}

export function DemographicQuestions() {
  const { getInputProps } = useAdPurchaseFormContext();
  const display = getInputProps("advanced_options").value;
  return (
    <FormSection title={<Title fw={400}>Who's your target audience?</Title>}>
      <Regions />
      <AdvancedToggle />
      <Collapse in={display} transitionDuration={300}>
        <Stack spacing={"md"}>
          <Section />
          <Age />
          <Gender />
          <Publications />
        </Stack>
      </Collapse>
    </FormSection>
  );
}
