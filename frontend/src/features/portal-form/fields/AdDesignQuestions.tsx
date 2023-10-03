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
} from "@mantine/core";
import { IconCirclePlus, IconUpload } from "@tabler/icons-react";
import { PersonalAdSelection } from "../types";
import { useAdPurchaseFormContext } from "../form-context";
import { FormSection } from "../../../components/FormSection";
import { useState } from "react";

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
  const [currentColorPicker, setCurrentColorPicker] = useState<string>("");

  const handleColorAdd = () => {
    const newColors = [...currentColors];
    newColors.push(currentColorPicker);
    setCurrentColors(newColors);
  };

  const handleSelectChange = (newValues: string[]) => {
    setCurrentColors(newValues);
  };

  return (
    <Box>
      <Text>Your brand colors</Text>
      <Paper withBorder p="lg">
        <Stack spacing={"md"}>
          <Flex align={"center"} gap={"md"}>
            <ColorInput
              size="md"
              withEyeDropper={false}
              onChange={setCurrentColorPicker}
            />
            <Button
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
            value={currentColors}
          />
          {/* <Center>
        {currentColors.map((color) => {
          return <Chip color={color}>{color}</Chip>;
        })}
      </Center> */}
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
        <MultiColorPicker />
        <FileInput
          label="Brand Logo"
          icon={<IconUpload size={rem(14)} />}
          size="md"
          {...getInputProps("brand_logo_checksum")}
        />
        <Textarea
          label="Provide any particular text you'd like included in the ad here"
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
