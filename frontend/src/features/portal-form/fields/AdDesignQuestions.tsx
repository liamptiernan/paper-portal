import {
  Box,
  Collapse,
  FileInput,
  Group,
  Paper,
  Radio,
  rem,
  Stack,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { PersonalAdSelection } from "../types";
import { useAdPurchaseFormContext } from "../form-context";

function PersonalAdSelect() {
  const { getInputProps } = useAdPurchaseFormContext();
  return (
    <Radio.Group
      label={
        <Text mb="sm" fw={700}>
          Should we design the ad, or do you already have an ad you'd like to
          print?
        </Text>
      }
      {...getInputProps("personal_ad")}
    >
      <Group>
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
      </Group>
    </Radio.Group>
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
        icon={<IconUpload size={rem(14)} />}
        {...getInputProps("personal_ad_checksum")}
      />
    </Collapse>
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
    </Collapse>
  );
}

export function AdDesignQuestions() {
  return (
    <Paper shadow="xs" withBorder p="sm">
      <Stack spacing={"sm"}>
        <PersonalAdSelect />
        <PersonalAdQuestions />
        <DesignedAdQuestions />
      </Stack>
    </Paper>
  );
}
