import {
  ActionIcon,
  Group,
  TextInput,
  Text,
  Title,
  Stack,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { usePublicationFormContext } from "./form-context";
import { PublicationRegion } from "./types";
import { IconTrash } from "@tabler/icons-react";
import { ActionButton } from "../../components/Actions";

export function PublicationRegions() {
  const { getInputProps, removeListItem, insertListItem } =
    usePublicationFormContext();

  const units = getInputProps("distribution_unit").value;

  const fields = getInputProps("regions")
    .value.map((item: Partial<PublicationRegion>, index: number) => (
      <Group key={item.id || item.key} mt="xs">
        <TextInput
          placeholder="Zip"
          withAsterisk
          style={{ flex: 1 }}
          {...getInputProps(`regions.${index}.name`)}
        />
        <TextInput
          placeholder={units}
          {...getInputProps(`regions.${index}.reach`, {
            type: "checkbox",
          })}
        />
        <ActionIcon
          color="red"
          onClick={() => removeListItem("regions", index)}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    ))
    .reverse();

  return (
    <Stack>
      <Group position="apart">
        <Title order={4}>Region Data</Title>{" "}
        <ActionButton
          onClick={() =>
            insertListItem("regions", {
              name: "",
              active: false,
              key: randomId(),
            })
          }
        >
          Add region
        </ActionButton>
      </Group>
      <Stack spacing={"none"}>
        {fields.length > 0 ? (
          <Group mb="xs">
            <Text fw={500} size="sm" style={{ flex: 1 }}>
              Zip Code
            </Text>
            <Text fw={500} size="sm" pr={130}>
              Distribution
            </Text>
          </Group>
        ) : (
          <Text c="dimmed" ta="center">
            No Regions Defined
          </Text>
        )}
        {fields}
      </Stack>
    </Stack>
  );
}
