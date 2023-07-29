import {
  Box,
  Stack,
  TextInput,
  Radio,
  rem,
  FileInput,
  Textarea,
  MultiSelect,
  Switch,
  Select,
  RangeSlider,
  Checkbox,
  Slider,
} from "@mantine/core";
import { GetInputProps } from "@mantine/form/lib/types";
import { IconUpload } from "@tabler/icons-react";
import { AdPurchase, PersonalAdSelection } from "./types";
import { useAdPurchaseFormContext } from "./form-context";

function PersonalAdSelect() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Radio.Group
      label={
        "Should we design the ad, or do you already have an ad you'd like to print?"
      }
      {...getInputProps("personal_ad")}
    >
      <Stack mt="sm">
        <Radio
          value={PersonalAdSelection.Designed}
          label={"Design an ad for me"}
          transitionDuration={200}
        />
        <Radio
          value={PersonalAdSelection.Personal}
          label={"I have my own ad"}
          transitionDuration={200}
        />
      </Stack>
    </Radio.Group>
  );
}

function PersonalAdQuestions() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <FileInput
      label="Upload Your Ad"
      icon={<IconUpload size={rem(14)} />}
      {...getInputProps("personal_ad_checksum")}
    />
  );
}

function DesignAdQuestions() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Box>
      <TextInput
        label="Brand Colors"
        {...getInputProps("brand_colors")}
      ></TextInput>
      <FileInput
        label="Brand Logo"
        icon={<IconUpload size={rem(14)} />}
        {...getInputProps("brand_logo_checksum")}
      />
      <Textarea
        label="Provide any particular text you'd like included in the ad here"
        {...getInputProps("provided_copy")}
      ></Textarea>
    </Box>
  );
}

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

function Gender() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Checkbox.Group label="Gender" {...getInputProps("target_genders")}>
      <Checkbox label="Male" />
      <Checkbox label="Female" />
    </Checkbox.Group>
  );
}

function SpendSlider() {
  const { getInputProps } = useAdPurchaseFormContext();
  const marks = [
    { value: 0, label: 0 },
    { value: 1000, label: 1000 },
  ];
  const label = (value: number) => {
    return `$${value}`;
  };
  return (
    <>
      <p>How much do you want to spend per month?</p>
      <Slider
        precision={2}
        step={5}
        min={5}
        max={1000}
        marks={marks}
        label={label}
        labelAlwaysOn
        {...getInputProps("target_monthly_spend")}
      />
    </>
  );
}

export function AdInfo() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Stack spacing="lg">
      <TextInput
        label={"What does your business do?"}
        {...getInputProps("business_description")}
      />
      <TextInput
        label={"What is the goal of your ad campaign?"}
        {...getInputProps("campaign_goal")}
      />
      <PersonalAdSelect />
      <PersonalAdQuestions />
      <DesignAdQuestions />
      <Regions />
      <Switch
        label="View advanced options"
        labelPosition="left"
        {...getInputProps("advanced_options", { type: "checkbox" })}
      />
      <Section />
      <p>Age</p>
      <RangeSlider
        label="Age range to target"
        min={1}
        max={100}
        {...getInputProps("target_ages")}
      />
      <Gender />
      <Publications />
      <SpendSlider />
    </Stack>
  );
}
