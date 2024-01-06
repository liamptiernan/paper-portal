import {
  Box,
  Collapse,
  FileInput,
  Paper,
  rem,
  Stack,
  Textarea,
  Text,
  Title,
  Space,
  SegmentedControl,
  Center,
  ColorInput,
  Button,
  Flex,
  MultiSelect,
  MediaQuery,
  TextInput,
} from "@mantine/core";
import { IconCirclePlus, IconUpload } from "@tabler/icons-react";
import { PersonalAdSelection } from "../types";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";
import { useState } from "react";
import { ColorSelectValue } from "../../../components/Select";

function PersonalAdSelect() {
  const { getInputProps } = useAdPurchaseFormContext();
  const options = [
    { label: "Design an ad for me", value: PersonalAdSelection.Designed },
    { label: "I have my own", value: PersonalAdSelection.Personal },
  ];
  return (
    <Center>
      <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
        <SegmentedControl
          data={options}
          size="md"
          transitionDuration={200}
          {...getInputProps("personal_ad")}
        />
      </MediaQuery>
      <MediaQuery largerThan={"md"} styles={{ display: "none" }}>
        <SegmentedControl
          data={options}
          size="xs"
          transitionDuration={200}
          {...getInputProps("personal_ad")}
        />
      </MediaQuery>
    </Center>
  );
}

function PersonalAdQuestions() {
  const { getInputProps } = useAdPurchaseFormContext();
  const display =
    getInputProps("personal_ad").value &&
    getInputProps("personal_ad").value === PersonalAdSelection.Personal;
  return (
    <Collapse
      in={display}
      transitionDuration={200}
      transitionTimingFunction="linear"
    >
      <FileInput
        label="Upload Your Ad"
        size="md"
        icon={<IconUpload size={rem(14)} />}
        {...getInputProps("personal_ad_checksum")}
      />
    </Collapse>
  );
}

function MultiColorPicker() {
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const [currentColorPicker, setCurrentColorPicker] = useState<string>();

  const handleColorAdd = () => {
    const newColors = [...currentColors];
    if (!currentColorPicker) {
      return;
    }
    newColors.push(currentColorPicker);
    setCurrentColors(newColors);
    setCurrentColorPicker("");
  };

  const handleSelectChange = (newValues: string[]) => {
    setCurrentColors(newValues);
  };

  return (
    <Box>
      <Text>Your brand colors</Text>
      <Text color="dark.2" size={"sm"}>
        Specific brand colors you'd like us to use in the ad
      </Text>
      <Paper withBorder p="lg">
        <Stack spacing={"md"}>
          <Flex align={"center"} gap={"md"}>
            <ColorInput
              size="md"
              placeholder="Enter a color"
              withEyeDropper={false}
              onChange={setCurrentColorPicker}
              value={currentColorPicker}
            />
            <Button
              disabled={!currentColorPicker}
              onClick={handleColorAdd}
              variant="subtle"
              leftIcon={<IconCirclePlus />}
              radius={"xl"}
              size="sm"
              compact
            >
              Add Color
            </Button>
          </Flex>
          <MultiSelect
            clearable
            data={currentColors}
            onChange={handleSelectChange}
            size="md"
            valueComponent={ColorSelectValue}
            value={currentColors}
          />
        </Stack>
      </Paper>
    </Box>
  );
}

function DesignedAdQuestions() {
  const { getInputProps } = useAdPurchaseFormContext();
  const display =
    getInputProps("personal_ad").value &&
    getInputProps("personal_ad").value === PersonalAdSelection.Designed;
  return (
    <Collapse
      in={display}
      transitionDuration={200}
      transitionTimingFunction="linear"
    >
      <Stack spacing={"xl"}>
        <Text color="dark.2">
          Please provide some information so we can design your ad
        </Text>
        <MultiColorPicker />
        <FileInput
          label="Brand Logo"
          icon={<IconUpload size={rem(14)} />}
          size="md"
          {...getInputProps("brand_logo_checksum")}
        />
        <TextInput
          label="Business Phone #"
          description="Optional. Phone number you want to appear in the ad"
          size="md"
          {...getInputProps("ad_phone_number")}
        />
        <TextInput
          label="Business Email"
          description="Optional. Email address you want to appear in the ad"
          size="md"
          {...getInputProps("ad_email")}
        />
        <TextInput
          label="Website"
          description="Optional. Website address you want to appear in the ad"
          size="md"
          {...getInputProps("ad_website")}
        />
        <Textarea
          label="Please provide the copy you want included in your ad"
          description="A short piece of text you want to appear in your ad"
          size="md"
          {...getInputProps("provided_copy")}
        ></Textarea>
      </Stack>
    </Collapse>
  );
}

function SectionTitle() {
  return (
    <Title fw={400}>
      <Text span inherit>
        Now for your ad design.
      </Text>
      <Space h="md" />
      <Text inherit fw={400} fz={"xl"}>
        Should we design the ad, or do you already have an ad you'd like to
        print?
      </Text>
    </Title>
  );
}

export function AdDesignQuestions() {
  return (
    <FormSection title={<SectionTitle />}>
      <PersonalAdSelect />
      <PersonalAdQuestions />
      <DesignedAdQuestions />
    </FormSection>
  );
}
