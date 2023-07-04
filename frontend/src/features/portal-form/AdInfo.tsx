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
import { IconUpload } from "@tabler/icons-react";

function PersonalAdSelect() {
  return (
    <Radio.Group
      label={
        "Should we design the ad, or do you already have an ad you'd like to print?"
      }
    >
      <Stack mt="sm">
        <Radio
          value={"design_ad"}
          label={"Design an ad for me"}
          transitionDuration={200}
        />
        <Radio
          value={"personal_ad"}
          label={"I have my own ad"}
          transitionDuration={200}
        />
      </Stack>
    </Radio.Group>
  );
}

function PersonalAdQuestions() {
  return (
    <FileInput label="Upload Your Ad" icon={<IconUpload size={rem(14)} />} />
  );
}

function DesignAdQuestions() {
  return (
    <Box>
      <TextInput label="Brand Colors"></TextInput>
      <FileInput label="Brand Logo" icon={<IconUpload size={rem(14)} />} />
      <Textarea label="Provide any particular text you'd like included in the ad here"></Textarea>
    </Box>
  );
}

function Regions() {
  const options = [
    { value: "greenville", label: "Greenville" },
    { value: "coxsackie", label: "Coxsackie" },
    { value: "albany", label: "Albany" },
  ];
  return (
    <MultiSelect label="What regions do you want to target?" data={options} />
  );
}

function Section() {
  const options = [
    { value: "sports", label: "Sports" },
    { value: "news", label: "News" },
    { value: "local_events", label: "Local Events" },
  ];
  return (
    <Select
      label="What section of the paper do you want your ad to appear in?"
      data={options}
    />
  );
}

function Publications() {
  const options = [
    { value: "greenville_times", label: "Greenville Times" },
    { value: "ravena_herald", label: "Ravena Herald" },
    { value: "albany_courier", label: "Albany Courier" },
  ];
  return (
    <MultiSelect
      label="What publications do you want your ad to appear in?"
      data={options}
    />
  );
}

function Gender() {
  return (
    <Checkbox.Group label="Gender">
      <Checkbox label="Male" />
      <Checkbox label="Female" />
    </Checkbox.Group>
  );
}

function SpendSlider() {
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
        defaultValue={50}
        marks={marks}
        label={label}
        labelAlwaysOn
      />
    </>
  );
}

export function AdInfo() {
  return (
    // Step 1
    <Box>
      <TextInput label={"What does your business do?"}></TextInput>
      <TextInput label={"What is the goal of your ad campaign?"}></TextInput>
      <PersonalAdSelect />
      <PersonalAdQuestions />
      <DesignAdQuestions />
      <Regions />
      <Switch label="View advanced options" labelPosition="left" />
      <Section />
      <p>Age</p>
      <RangeSlider label="Age range to target" min={1} max={100} />
      <Gender />
      <Publications />
      <SpendSlider />
    </Box>
  );
}
