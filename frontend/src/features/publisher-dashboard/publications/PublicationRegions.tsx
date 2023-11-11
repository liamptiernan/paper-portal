import {
  ActionIcon,
  Group,
  Text,
  Title,
  Stack,
  Select,
  Button,
  Drawer,
  List,
  Slider,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePublicationFormContext } from "./form-context";
import { PublicationRegion } from "../types";
import { IconHelpSquareRounded, IconTrash } from "@tabler/icons-react";
import { ActionButton } from "../../../components/Actions";

export function RegionDataSelect() {
  const { getInputProps } = usePublicationFormContext();
  const [opened, { open, close }] = useDisclosure();
  const options = [
    { label: "Regions", value: "regions" },
    { label: "Radius", value: "radius" },
    { label: "None", value: "none" },
  ];

  const helpDrawer = (
    <Drawer
      opened={opened}
      position="right"
      onClose={close}
      title={
        <Title order={2} fw="400">
          How do I choose a regional distribution type?
        </Title>
      }
    >
      <Title mb={"sm"} order={3} color="gray.8" fw="400">
        How you define your regional distribution affects how customers can find
        and customize your ads. The more detailed the information you can
        provide, the better.
      </Title>
      <Title order={4}>By Region</Title>
      <List>
        <List.Item>
          <Text td={"underline"}>
            Best for when you know exactly which zip codes you distribute to
          </Text>
        </List.Item>
        <List.Item>The best option, if you have the data</List.Item>
        <List.Item>
          Provide a list of zip codes that you reach, and optionally provide
          your individual distribution in each zip code
        </List.Item>
        <List.Item>
          Provides the best customer experience. Allows customers the most
          insight into how many people they reach with their ad
        </List.Item>
      </List>
      <Title mt="xs" order={4}>
        By Radius
      </Title>
      <List>
        <List.Item>
          <Text td={"underline"}>
            Best for when you don't have per zip code data
          </Text>
        </List.Item>
        <List.Item>
          Provide a given mile radius with your location as the center
        </List.Item>
        <List.Item>
          We'll evenly spread your total distribution count over this area
        </List.Item>
      </List>

      <Title mt="xs" order={4}>
        None
      </Title>
      <List>
        <List.Item>
          <Text td={"underline"}>
            Best for digital, if you don't know exactly where your viewers are
            based
          </Text>
        </List.Item>
        <List.Item>
          We'll assume your reach is roughly centered near your location, and
          estimate its radius based on your total reach
        </List.Item>
      </List>
    </Drawer>
  );

  const description = (
    <Button variant="subtle" compact ml="0" p="0" onClick={open}>
      <Group spacing={".25rem"}>
        How do I decide <IconHelpSquareRounded />
      </Group>
    </Button>
  );
  return (
    <>
      <Select
        label="How do you want to define your regional distribution?"
        description={description}
        size="md"
        data={options}
        required
        {...getInputProps("region_type")}
      ></Select>
      {helpDrawer}
    </>
  );
}

export function PublicationRegionRadius() {
  const { getInputProps } = usePublicationFormContext();
  const display = getInputProps("region_type").value === "radius";
  const marks = [
    { value: 1, label: "1mi" },
    { value: 10, label: "10mi" },
    { value: 25, label: "25mi" },
    { value: 50, label: "50mi" },
    { value: 75, label: "75mi" },
    { value: 100, label: "100mi" },
  ];
  return (
    display && (
      <Stack spacing={"none"} style={{ minWidth: "400px" }}>
        <Text color="brandDark">Distribution Radius</Text>
        <Text size="sm" color="gray.6">
          How far is your publication distributed
        </Text>
        <Slider
          mt="sm"
          ml=".25rem"
          marks={marks}
          label={(value) => `${value} miles`}
          min={0}
          max={100}
          {...getInputProps("distribution_radius")}
        ></Slider>
      </Stack>
    )
  );
}

export function PublicationRegions() {
  const { getInputProps, removeListItem, insertListItem } =
    usePublicationFormContext();

  const display = getInputProps("region_type").value === "regions";
  const units = getInputProps("distribution_unit").value;

  const fields = getInputProps("regions").value.map(
    (item: Partial<PublicationRegion>, index: number) => (
      <Group key={item.id || index} mt="xs">
        <TextInput
          withAsterisk
          style={{ flex: 1 }}
          {...getInputProps(`regions.${index}.zip_code`)}
        />
        <NumberInput {...getInputProps(`regions.${index}.reach`)} />
        <ActionIcon
          color="red"
          onClick={() => removeListItem("regions", index)}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    )
  );

  return (
    display && (
      <Stack>
        <Group position="apart">
          <Title order={4}>Region Data</Title>{" "}
          <ActionButton
            onClick={() =>
              insertListItem("regions", {
                zip_code: "",
                reach: undefined,
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
              <Stack spacing={"none"}>
                <Text fw={500} size="sm" pr={"40px"}>
                  Distribution ({units})
                </Text>
              </Stack>
            </Group>
          ) : (
            <Text c="dimmed" ta="center">
              No Regions Defined
            </Text>
          )}
          {fields}
        </Stack>
      </Stack>
    )
  );
}
