import { Flex, Group, Paper, Text, Title } from "@mantine/core";
import { useTextStyles } from "./styles";

export function MainNavBar() {
  const { classes } = useTextStyles();
  return (
    <Paper>
      <nav>
        <Flex gap={"md"}>
          <Group>
            <Title className={classes.mobileTitle} color="brandBlue">
              Ad Purchase Demo
            </Title>
          </Group>
          <Group ml={"auto"}>
            <Text>Demo</Text>
          </Group>
        </Flex>
      </nav>
    </Paper>
  );
}
