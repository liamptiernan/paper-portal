import { MultiSelect, Select, Space, Text, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";
import { DatePickerInput } from "@mantine/dates";

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
  if (options.length <= 1) {
    return null;
  }
  return (
    <MultiSelect
      label="What publications do you want your ad to appear in?"
      data={options}
      size="md"
      required
      {...getInputProps("target_publications")}
    />
  );
}

function PublicationDate() {
  const { getInputProps } = useAdPurchaseFormContext();

  return (
    <DatePickerInput
      label="In what range of dates would you like us to print your ad?"
      type="range"
      size="md"
      {...getInputProps("target_dates")}
    />
  );
}

export function DemographicQuestions() {
  const SectionTitle = (
    <Title fw={400}>
      <Text span inherit>
        Who's your target audience?
      </Text>
      <Space h="md" />
      <Text inherit fw={400} fz={"xl"} color="brandDark.2">
        Leave optional questions blank, and we'll make the best decision for
        you.
      </Text>
    </Title>
  );
  return (
    <FormSection title={SectionTitle}>
      <Publications />
      <Section />
      <PublicationDate />
    </FormSection>
  );
}
