import { Box, Stack, TextInput, Radio, FileInput } from "@mantine/core";

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
  return <FileInput label="Upload Your Ad" />;
}

export function AdInfo() {
  return (
    // Step 1
    <Box>
      <TextInput label={"Business Name"}></TextInput>
      <TextInput label={"What does your business do?"}></TextInput>
      <TextInput label={"What is the goal of your ad campaign?"}></TextInput>
      <PersonalAdSelect />
      <p>What region(s) do you want to target?</p>
      <p>Advanced:</p>
      <p>By Section:</p>
      <p>Age</p>
      <p>Gender</p>
      <p>specfic publications?</p>
      <p>How much do you want to spend per month?</p>
    </Box>
  );
}
