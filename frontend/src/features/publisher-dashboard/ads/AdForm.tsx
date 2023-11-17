import { useNavigate } from "react-router-dom";
import { useTryToast } from "../../../hooks/useTryToast";
import { useUpdatePublicationAdOfferingMutation } from "../publications/publicationsApi";
import { AdOffering } from "../types";
import {
  AdOfferingFormProvider,
  useAdOfferingForm,
  useAdOfferingFormContext,
} from "./offering-form-context";
import {
  Box,
  Divider,
  Flex,
  MultiSelect,
  RangeSlider,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPalette, IconPaletteOff } from "@tabler/icons-react";
import { ActionButton } from "../../../components/Actions";
import { AdOfferingDeleteModal } from "./DeleteModal";
import { useDisclosure } from "@mantine/hooks";

function PageRange() {
  const { getInputProps } = useAdOfferingFormContext();

  return (
    <Stack>
      <Text>Page Range</Text>
      <RangeSlider label={"test"} size="md" {...getInputProps("page_start")} />
    </Stack>
  );
}

function SizeSelector() {
  const { getInputProps } = useAdOfferingFormContext();
  const options = [
    {
      label: "1/4 Page",
      value: "1/4 Page",
    },
  ];
  return (
    <MultiSelect
      label={"Ad Size"}
      size="md"
      data={options}
      {...getInputProps("size")}
    />
  );
}

export function AdOfferingForm({ adOffering }: { adOffering: AdOffering }) {
  // TODO: maybe set null values to ""?
  const [opened, { close, open }] = useDisclosure(false);
  const initialValues = { ...adOffering };
  const saveToast = useTryToast(
    { title: "Ad Unit Saved" },
    { title: "An error occurred while saving the ad unit" }
  );
  const [updateAdOffering, { isLoading }] =
    useUpdatePublicationAdOfferingMutation();
  const form = useAdOfferingForm({
    initialValues,
    validate: {},
  });

  const navigate = useNavigate();

  const handleSubmit = async (
    values: AdOffering,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await saveToast(updateAdOffering(values).unwrap);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdOfferingFormProvider form={form}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
          <Box pb="5rem">
            <Stack spacing={"xl"} w="580px">
              <TextInput
                label="Ad Unit Name"
                size="md"
                required
                {...form.getInputProps("name")}
              />
              <SizeSelector />
              <PageRange />
              <Switch
                label="Printed in Color"
                size="md"
                onLabel={<IconPalette size="1rem" stroke={2} />}
                offLabel={<IconPaletteOff size="1rem" stroke={2} />}
                {...form.getInputProps("color", { type: "checkbox" })}
              />
              <Divider />
              <ActionButton w="12rem" compact color="brandRed" onClick={open}>
                Delete Ad Unit
              </ActionButton>
            </Stack>
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
              onClick={() => navigate("..")}
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
      <AdOfferingDeleteModal
        opened={opened}
        close={close}
        adOffering={adOffering}
      />
    </AdOfferingFormProvider>
  );
}
