import { Container, Paper, Stack } from "@mantine/core";
import { ReactElement } from "react";
import { useFormSectionStyles } from "../features/portal-form/styles";

export function FormSection({
  title,
  children,
}: {
  title: ReactElement;
  children: ReactElement[];
}) {
  const { classes } = useFormSectionStyles();

  return (
    <Container size={"sm"}>
      <Paper className={classes.sectionPaper}>
        <Stack spacing="xl" className={classes.sectionStack}>
          {title}
          <Stack
            spacing="xl"
            mt={"xl"}
            style={{ width: "90%", alignSelf: "center" }}
          >
            {children.map((fieldComponent) => fieldComponent)}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
