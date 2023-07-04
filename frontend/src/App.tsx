import { MantineProvider, Text } from "@mantine/core";
import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AdPurchaseForm />
    </MantineProvider>
  );
}
