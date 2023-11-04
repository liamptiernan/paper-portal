import {
  Drawer,
  Flex,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  PublicationFormProvider,
  usePublicationForm,
  usePublicationFormContext,
} from "./form-context";
import { Publication } from "./types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closePublicationForm, publicationFormOpen } from "./publisherSlice";
import { PublicationRegions } from "./PublicationRegions";
import { PrimaryButton } from "../../components/Actions";

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

  return (
    <Select
      label="Format"
      description="If available in multiple formats, create a publication for each"
      size="md"
      data={options}
      withAsterisk
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
      regions: [],
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
        <Stack
          spacing={"xl"}
          style={{ overflowY: "auto", height: "calc(100vh - 130px)" }}
        >
          <TextInput
            label="Name"
            description="Name of the publication"
            size="md"
            withAsterisk
            {...form.getInputProps("name")}
          />
          <Formats />
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
          <PublicationRegions />
        </Stack>
        <Flex
          pos="fixed"
          bottom="0"
          h="3rem"
          justify={"right"}
          align={"center"}
          style={{ width: "calc(100% - 32px)" }}
        >
          <PrimaryButton w="8rem" type="submit" mr="md">
            Save
          </PrimaryButton>
        </Flex>
      </form>
    </PublicationFormProvider>
  );
}

export function PublicationFormModal() {
  const opened = useAppSelector(publicationFormOpen);
  const dispatch = useAppDispatch();

  return (
    <Drawer
      title={
        <Title order={3} mb={"md"}>
          Create a new publication
        </Title>
      }
      opened={opened}
      onClose={() => dispatch(closePublicationForm())}
      position={"right"}
      keepMounted={true}
    >
      {<PublicationForm />}
    </Drawer>
  );
}
