import { Modal, Stack, Text, TextInput, Title } from "@mantine/core";
import { AdOffering } from "../types";
import { useForm } from "@mantine/form";
import { useDeletePublicationAdOfferingMutation } from "../publications/publicationsApi";
import { useTryToast } from "../../../hooks/useTryToast";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../components/Actions";

export function AdOfferingDeleteModal({
  opened,
  close,
  adOffering,
}: {
  opened: boolean;
  close: () => void;
  adOffering: AdOffering;
}) {
  const [deleteAdOffering, { isLoading }] =
    useDeletePublicationAdOfferingMutation();
  const toast = useTryToast(
    { title: `Deleted ad unit ${adOffering.name}` },
    { title: "Error deleting ad unit" }
  );
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      nameConfirm: "",
    },
    validate: {
      nameConfirm: (value) => {
        return value !== adOffering.name ? "Name must match exactly" : null;
      },
    },
  });
  const handleDelete = async () => {
    try {
      await toast(async () => {
        await deleteAdOffering(adOffering.id).unwrap();
        navigate("..");
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={2}>Delete {adOffering.name}</Title>}
    >
      <form onSubmit={form.onSubmit(handleDelete)}>
        <Stack>
          <Text>
            This action is final. By deleting this ad unit, it will be deleted
            along with all of it's associated data.
          </Text>
          <Text>
            To confirm, enter the name of the ad unit in the box below
          </Text>
          <TextInput
            {...form.getInputProps("nameConfirm")}
            placeholder={adOffering.name}
            required
          />
          <PrimaryButton type="submit" color="brandRed" loading={isLoading}>
            Permanently Delete {adOffering.name}
          </PrimaryButton>
        </Stack>
      </form>
    </Modal>
  );
}
