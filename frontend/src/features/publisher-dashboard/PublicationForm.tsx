import {
  Box,
  Flex,
  Group,
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
import { Publication } from "./types";
import {
  PublicationRegionRadius,
  PublicationRegions,
  RegionDataSelect,
} from "./PublicationRegions";
import { ActionButton } from "../../components/Actions";
import { IconInfoSquareRounded } from "@tabler/icons-react";
import { PublicationFormHeader } from "./PublicationFormHeader";

interface PublicationFormProps {
  publication?: Publication;
}

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
      withAsterisk
      {...getInputProps("distribution_unit")}
    />
  );
}

function PublicationForm({ publication }: PublicationFormProps) {
  let initialValues: Partial<Publication> | undefined = publication;
  if (!initialValues) {
    initialValues = {
      name: "",
      regions: [{ zip_code: "", reach: "" }],
    };
  }
  const form = usePublicationForm({
    initialValues,
    validate: {},
  });

  const handleSubmit = (
    values: Partial<Publication>,
    _event: React.FormEvent<HTMLFormElement>
  ) => {
    console.log("submit");
    console.log(values);
    console.log(_event);
  };

  return (
    <PublicationFormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
          <Stack spacing={"xl"} pb="lg">
            <Box w="580px">
              <TextInput
                label="Publication Name"
                size="md"
                withAsterisk
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Description"
                description="Short description of what your publication is, and who your audience is"
                placeholder='e.g. "A trade magazine for electricians in the North East"'
                size="md"
                withAsterisk
                {...form.getInputProps("description")}
              />
              <Group>
                <Formats />
                <TextInput
                  label="Location"
                  description="The approximate center of your distribution area"
                  placeholder="Address, Zip Code, or City/Town Name"
                  size="md"
                  withAsterisk
                  rightSectionWidth="5rem"
                  {...form.getInputProps("location")}
                />
              </Group>
            </Box>
            <Flex align="flex-start" gap={"5rem"}>
              <Stack spacing={"xl"}>
                <Title order={4} my="sm">
                  Demographic Data
                </Title>
                <DistributionUnits />
                <TextInput
                  label="Total Distribution"
                  description="Total distribution of the publication"
                  size="md"
                  withAsterisk
                  rightSectionWidth="5rem"
                  rightSection={<UnitsDisplay />}
                  {...form.getInputProps("estimated_reach")}
                />
                <RegionDataSelect />
              </Stack>
              <PublicationRegionRadius />
              <PublicationRegions />
            </Flex>
          </Stack>
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
            <ActionButton size="md" w="20rem" type="submit">
              Save Changes
            </ActionButton>
            <ActionButton size="md" w="8rem" type="submit" color="brandRed.3">
              Cancel
            </ActionButton>
          </Flex>
        </Box>
      </form>
    </PublicationFormProvider>
  );
}

export function PublicationCreatePage() {
  // pass in some handle submit
  return (
    <Stack w="100%">
      <PublicationFormHeader />
      <PublicationForm />
    </Stack>
  );
}
