import { Modal, Stack, Text, TextInput, Title } from "@mantine/core";
import { Publication } from "../types";
import { useForm } from "@mantine/form";
import { useDeletePublicationMutation } from "./publicationsApi";
import { useTryToast } from "../../../hooks/useTryToast";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../components/Actions";

export function PublicationDeleteModal({
  opened,
  close,
  publication,
}: {
  opened: boolean;
  close: () => void;
  publication: Publication;
}) {
  const [deletePublication, { isLoading }] = useDeletePublicationMutation();
  const toast = useTryToast(
    { title: `Deleted publication ${publication.name}` },
    { title: "Error deleting publication" }
  );
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      nameConfirm: "",
    },
    validate: {
      nameConfirm: (value) => {
        return value !== publication.name ? "Name must match exactly" : null;
      },
    },
  });
  const handleDelete = async () => {
    try {
      await toast(async () => {
        await deletePublication(publication.id).unwrap();
        navigate("/publisher/publications");
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Title order={2}>Delete {publication.name}</Title>}
    >
      <form onSubmit={form.onSubmit(handleDelete)}>
        <Stack>
          <Text>
            This action is final. By deleting this publication, it will be
            deleted along with all of it's associated data, including any ads.
          </Text>
          <Text>
            To confirm, enter the name of the publication in the box below
          </Text>
          <TextInput
            {...form.getInputProps("nameConfirm")}
            placeholder={publication.name}
            required
          />
          <PrimaryButton type="submit" color="brandRed" loading={isLoading}>
            Permanently Delete {publication.name}
          </PrimaryButton>
        </Stack>
      </form>
    </Modal>
  );
}
