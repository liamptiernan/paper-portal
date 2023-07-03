import { MantineProvider, Text } from "@mantine/core";
import { PortalForm } from "./features/portal-form/PortalForm";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <PortalForm />
    </MantineProvider>
  );
}
