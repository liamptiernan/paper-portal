import { Container, Paper, Stack } from "@mantine/core";
import { ReactElement } from "react";

export function FormSection({
  styles,
  title,
  children,
}: {
  styles: React.CSSProperties;
  title: ReactElement;
  children: ReactElement[];
}) {
  return (
    <Container size={"sm"} style={styles}>
      <Paper p="lg">
        <Stack spacing="xl">
          {title}
          <Stack
            spacing="xl"
            mt={"xl"}
            style={{ width: "75%", alignSelf: "center" }}
          >
            {children.map((fieldComponent) => fieldComponent)}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
