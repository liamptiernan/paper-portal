import { Paper, Slider, Title } from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";

export function SpendSlider({ styles }: { styles: React.CSSProperties }) {
  const { getInputProps } = useAdPurchaseFormContext();
  const marks = [
    { value: 10, label: "$10" },
    { value: 250, label: "$250" },
    { value: 500, label: "$500" },
    { value: 750, label: "$1000" },
    { value: 1500, label: "$1500" },
  ];

  const label = (value: number) => {
    return `$${value}`;
  };

  const scaleCalc = (v: number) => {
    if (v <= 500) {
      return v;
    }
    return (v - 500) * 2 + 500;
  };

  return (
    <FormSection
      styles={styles}
      title={<Title fw={400}>What's your monthly budget?</Title>}
    >
      <></>
      <Slider
        color="brandSaffron"
        precision={2}
        scale={scaleCalc}
        step={10}
        min={10}
        max={1000}
        marks={marks}
        label={label}
        labelAlwaysOn
        size={"xl"}
        {...getInputProps("target_monthly_spend")}
      />
    </FormSection>
  );
}
