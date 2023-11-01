import { Drawer } from "@mantine/core";
import { PublicationFormProvider, usePublicationForm } from "./form-context";
import { Publication } from "./types";
import { useDisclosure } from "@mantine/hooks";

interface PublicationFormProps {
  publication?: Publication;
}

function PublicationForm({ publication }: PublicationFormProps) {
  let initialValues = publication;
  if (!initialValues) {
    initialValues = {
      name: "",
    };
  }
  const form = usePublicationForm({
    initialValues,
    validate: {},
  });
  return (
    <PublicationFormProvider form={form}>
      <form>test</form>
    </PublicationFormProvider>
  );
}

export function PublicationFormModal() {
  const [opened, { close }] = useDisclosure(true);
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position={"right"}
      keepMounted={true}
    >
      {<PublicationForm />}
    </Drawer>
  );
}
