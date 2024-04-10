import { Box, MediaQuery, Slider, Switch, Text, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "../../form-context";
import { FormSection } from "../../../../components/FormSection";
import { AdChoices } from "./AdChoices";

function SpendSlider() {
  const { getInputProps } = useAdPurchaseFormContext();
  const marks = [
    { value: 10, label: "$10" },
    { value: 250, label: "$250" },
    { value: 500, label: "$500" },
    { value: 750, label: "$750" },
    { value: 1000, label: "$1000" },
    { value: 1500, label: "$1500" },
    { value: 2500, label: "$2500" },
  ];

  const smallMarks = [
    { value: 10, label: "$10" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1000" },
    { value: 2500, label: "$2500" },
  ];

  const label = (value: number) => {
    return `$${value}`;
  };

  return (
    <Box mb="xl">
      <Text>What's your monthly budget?</Text>
      <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
        <Slider
          color="brandYellow"
          precision={2}
          step={10}
          min={10}
          max={2500}
          marks={marks}
          label={label}
          labelAlwaysOn
          size={"xl"}
          {...getInputProps("target_monthly_spend")}
        />
      </MediaQuery>
      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <Slider
          color="brandYellow"
          precision={2}
          step={10}
          min={10}
          max={2500}
          marks={smallMarks}
          label={label}
          labelAlwaysOn
          size={"xl"}
          {...getInputProps("target_monthly_spend")}
        />
      </MediaQuery>
    </Box>
  );
}

export function BudgetOptions() {
  const { getInputProps } = useAdPurchaseFormContext();
  const SectionTitle = (
    <Title fw={400}>
      <Text span inherit>
        Tell us about your budget
      </Text>
    </Title>
  );
  return (
    <FormSection title={SectionTitle}>
      <SpendSlider />
      <Switch
        label="Make this a reoccuring placement"
        description="Receive a discount and make a lasting impression with a monthly ad placement."
        size="md"
        {...getInputProps("page_end")}
      />
      <AdChoices />
    </FormSection>
  );
}
