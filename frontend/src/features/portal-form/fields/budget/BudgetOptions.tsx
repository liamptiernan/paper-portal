import { Box, MediaQuery, Slider, Text, Title } from "@mantine/core";
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
          size={"xl"}
          {...getInputProps("target_monthly_spend")}
        />
      </MediaQuery>
    </Box>
  );
}

export function BudgetOptions() {
  const SectionTitle = (
    <Title mb={"-1.25rem"} fw={400}>
      Choose the type of ads you want.
    </Title>
  );
  return (
    <FormSection title={SectionTitle}>
      <SpendSlider />
      <AdChoices />
    </FormSection>
  );
}
