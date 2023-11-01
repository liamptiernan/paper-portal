import { createFormContext } from "@mantine/form";
import { Publication } from "./types";

export const [
  PublicationFormProvider,
  usePublicationFormContext,
  usePublicationForm,
] = createFormContext<Publication>();
