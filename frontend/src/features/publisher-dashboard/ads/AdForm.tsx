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
  NumberInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPalette, IconPaletteOff } from "@tabler/icons-react";
import { ActionButton } from "../../../components/Actions";
import { AdOfferingDeleteModal } from "./DeleteModal";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

function PageRange() {
  const { getInputProps } = useAdOfferingFormContext();
  const startPageProps = getInputProps("page_start");
  const endPageProps = getInputProps("page_end");
  const [disableEndPage, setDisableEndPage] = useState(
    endPageProps.value === null
  );

  const handleToggleEndPage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDisableEndPage(value);
      if (value) {
        endPageProps.onChange(null);
      } else {
        endPageProps.onChange(startPageProps.value + 1);
      }
    },
    [setDisableEndPage, endPageProps, startPageProps]
  );

  const handleEndPageChange = (value: number) => {
    endPageProps.onChange(value);
  };

  const endPageValue = endPageProps.value === null ? "" : endPageProps.value;
  return (
    <Stack spacing={"none"}>
      <Text>Page Range</Text>
      <Text color="gray.6" size={"sm"}>
        Range of pages this ad is available on
      </Text>
      <Flex align={"center"} gap={"1rem"} mt="md">
        <NumberInput
          label="Range Start"
          size="md"
          required
          hideControls
          mr="md"
          w="7rem"
          {...startPageProps}
        />
        <NumberInput
          label="Range End"
          size="md"
          required
          hideControls
          w="7rem"
          disabled={disableEndPage}
          value={endPageValue}
          onChange={handleEndPageChange}
          // {...getInputProps("page_end")}
        />
        <Switch
          label="End of Publication"
          description="Make ad available until the last page"
          size="md"
          checked={disableEndPage}
          onChange={handleToggleEndPage}
          style={{ alignSelf: "flex-end" }}
        />
      </Flex>
    </Stack>
  );
}

function SizeSelector() {
  const { getInputProps } = useAdOfferingFormContext();
  const initialOptions = useMemo(() => {
    const initialOption = getInputProps("size").value;
    const defaultSizes = [
      "Full page",
      "3/4 page",
      "1/2 page",
      "1/4 page",
      "1/8 page",
    ];
    if (!defaultSizes.includes(initialOption)) {
      defaultSizes.unshift(initialOption);
    }
    return defaultSizes.map((size) => ({ label: size, value: size }));
  }, [getInputProps]);

  const [options, setOptions] = useState(initialOptions);
  return (
    <Select
      label={"Ad Size"}
      description={"Size on page"}
      size="md"
      searchable
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setOptions((current) => [...current, item]);
        return item;
      }}
      data={options}
      required
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
                description={"The name of this type of ad"}
                size="md"
                required
                {...form.getInputProps("name")}
              />
              <SizeSelector />
              <PageRange />
              <NumberInput
                label="Price per Placement"
                size="md"
                required
                precision={2}
                icon="$"
                hideControls
                mr="md"
                w="15rem"
                {...form.getInputProps("price")}
              />
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
