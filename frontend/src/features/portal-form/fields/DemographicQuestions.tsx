import {
  Collapse,
  MultiSelect,
  Select,
  Stack,
  Switch,
  Title,
} from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";

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
      <AdvancedToggle />
      <Collapse in={display} transitionDuration={300}>
        <Stack spacing={"md"}>
          {/* only display multiple options here if there are multiple options */}
          <Publications />
          <Section />
        </Stack>
      </Collapse>
    </FormSection>
  );
}
