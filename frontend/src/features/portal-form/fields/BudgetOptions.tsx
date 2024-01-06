import { MediaQuery, Slider, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";

export function SpendSlider() {
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
    <FormSection title={<Title fw={400}>What's your monthly budget?</Title>}>
      {/* display what ad this buys you */}
      {/* provide option to select ad type from a drop down */}
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
    </FormSection>
  );
}
