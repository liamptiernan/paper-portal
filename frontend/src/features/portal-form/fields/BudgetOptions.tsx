import { Paper, Slider } from "@mantine/core";
import { useAdPurchaseFormContext } from "../form-context";

export function SpendSlider() {
  const { getInputProps } = useAdPurchaseFormContext();
  const marks = [
    { value: 0, label: 0 },
    { value: 1000, label: 1000 },
  ];
  const label = (value: number) => {
    return `$${value}`;
  };
  return (
    <Paper shadow="xs" withBorder p="sm">
      <p>How much do you want to spend per month?</p>
      <Slider
        precision={2}
        step={5}
        min={5}
        max={1000}
        marks={marks}
        label={label}
        {...getInputProps("target_monthly_spend")}
      />
    </Paper>
  );
}
