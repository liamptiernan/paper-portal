import {
  Checkbox,
  Collapse,
  MultiSelect,
  Paper,
  RangeSlider,
  Select,
  Stack,
  Switch,
} from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";

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
      {...getInputProps("regions")}
    />
  );
}

function AdvancedToggle() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Switch
      label="View advanced options"
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
      {...getInputProps("target_section")}
    />
  );
}

function Age() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <RangeSlider
      label="Age range to target"
      min={1}
      max={100}
      {...getInputProps("target_ages")}
    />
  );
}

function Gender() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Checkbox.Group label="Gender" {...getInputProps("target_genders")}>
      <Checkbox label="Male" />
      <Checkbox label="Female" />
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
      {...getInputProps("target_publications")}
    />
  );
}

export function DemographicQuestions() {
  const { getInputProps } = useAdPurchaseFormContext();
  const display = getInputProps("advanced_options").value;
  return (
    <Paper shadow="xs" withBorder p="sm">
      <Regions />
      <AdvancedToggle />
      <Collapse in={display}>
        <Stack spacing={"sm"}>
          <Section />
          <p>Age</p>
          <Age />
          <Gender />
          <Publications />
        </Stack>
      </Collapse>
    </Paper>
  );
}
