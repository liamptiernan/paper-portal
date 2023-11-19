import { createFormContext } from "@mantine/form";
import { AdOffering } from "../types";

export const [
  AdOfferingFormProvider,
  useAdOfferingFormContext,
  useAdOfferingForm,
] = createFormContext<AdOffering>();
