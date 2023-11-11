import {
  Box,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  PublicationFormProvider,
  usePublicationForm,
  usePublicationFormContext,
} from "./form-context";
import { Publication } from "../types";
import {
  PublicationRegionRadius,
  PublicationRegions,
  RegionDataSelect,
} from "./PublicationRegions";
import { ActionButton } from "../../../components/Actions";
import { IconInfoSquareRounded } from "@tabler/icons-react";
import { useUpdatePublicationMutation } from "./publicationsApi";
import { useTryToast } from "../../../hooks/useTryToast";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { PublicationDeleteModal } from "./DeleteModal";

function UnitsDisplay() {
  const { getInputProps } = usePublicationFormContext();

  const units = getInputProps("distribution_unit").value;
  return (
    <Text color="gray.5" size={"sm"} pr="lg">
      {units}
    </Text>
  );
}

function Formats() {
  const { getInputProps } = usePublicationFormContext();
  const options = [
    { value: "print", label: "Print" },
    { value: "digital", label: "Digital" },
    { value: "social", label: "Social Media" },
  ];

  const label = (
    <Tooltip
      label="If available in multiple formats, create a publication for each"
      position="right"
    >
      <Group spacing={"none"}>
        Format
        <Text ml=".3rem" color="#ff8787">
          *
        </Text>
        <IconInfoSquareRounded
          size={"1.5rem"}
          color="#aaa"
          style={{ marginLeft: ".5rem" }}
        />
      </Group>
    </Tooltip>
  );

  return (
    <Select
      label={label}
      description="How you distribute it"
      size="md"
      data={options}
      required
      withAsterisk={false}
      {...getInputProps("format")}
    />
  );
}

function DistributionUnits() {
  const { getInputProps } = usePublicationFormContext();
  const options = [
    { value: "individuals", label: "Individuals" },
    { value: "households", label: "Households" },
    { value: "impressions", label: "Impressions" },
    { value: "subscribers", label: "Subscribers" },
  ];

  return (
    <Select
      label="Distribution Unit"
      description="Unit of measure for distribution numbers"
      size="md"
      data={options}
      required
      {...getInputProps("distribution_unit")}
    />
  );
}

interface PublicationFormProps {
  publication: Publication;
}

export function PublicationForm({ publication }: PublicationFormProps) {
  // TODO: maybe set null values to ""?
  const [opened, { close, open }] = useDisclosure(false);
  const initialValues = { ...publication };
  const saveToast = useTryToast(
    { title: "Publication Saved" },
    { title: "An error occurred while saving the publication" }
  );
  const [updatePublication, { isLoading }] = useUpdatePublicationMutation();
  const form = usePublicationForm({
    initialValues,
    validate: {},
  });

  const navigate = useNavigate();

  const handleSubmit = async (
    values: Publication,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await saveToast(updatePublication(values).unwrap);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PublicationFormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
          <Box pb="5rem">
            <Stack spacing={"xl"} w="580px">
              <TextInput
                label="Publication Name"
                size="md"
                required
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Description"
                description="Short description of what your publication is, and who your audience is"
                placeholder='e.g. "A trade magazine for electricians in the North East"'
                size="md"
                {...form.getInputProps("description")}
              />
              <Group>
                <Formats />
                <TextInput
                  label="Location"
                  description="The approximate center of your distribution area"
                  placeholder="Address, Zip Code, or City/Town Name"
                  size="md"
                  required
                  rightSectionWidth="5rem"
                  {...form.getInputProps("location")}
                />
              </Group>
            </Stack>
            <Flex align="flex-start" gap={"5rem"} mt="md">
              <Stack spacing={"xl"}>
                <Title order={4}>Demographic Data</Title>
                <DistributionUnits />
                <NumberInput
                  label="Total Distribution"
                  description="Total distribution of the publication"
                  size="md"
                  required
                  hideControls
                  rightSectionWidth="5rem"
                  rightSection={<UnitsDisplay />}
                  {...form.getInputProps("estimated_reach")}
                />
                <RegionDataSelect />
                <Divider />
                <ActionButton w="12rem" compact color="brandRed" onClick={open}>
                  Delete Publication
                </ActionButton>
              </Stack>
              <PublicationRegionRadius />
              <PublicationRegions />
            </Flex>
          </Box>
        </Box>
        <Box
          pos="fixed"
          bottom="0"
          h="3.5rem"
          w="calc(100vw - 165px)"
          sx={(theme) => ({
            borderTop: "1px solid",
            borderColor: theme.colors.gray[3],
            backgroundColor: "#fff",
          })}
        >
          <Flex gap={"md"} pt=".4rem" justify="space-between" pr="lg">
            <ActionButton loading={isLoading} size="md" w="20rem" type="submit">
              Save Changes
            </ActionButton>
            <ActionButton
              onClick={() => navigate("../..")}
              size="md"
              w="8rem"
              type="submit"
              color="brandRed.3"
            >
              Cancel
            </ActionButton>
          </Flex>
        </Box>
      </form>
      <PublicationDeleteModal
        opened={opened}
        close={close}
        publication={publication}
      />
    </PublicationFormProvider>
  );
}
