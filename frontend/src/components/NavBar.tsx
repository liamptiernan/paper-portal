import { Flex, Group, Paper, Text, ThemeIcon, Title } from "@mantine/core";
import { IconNews } from "@tabler/icons-react";

export function MainNavBar() {
  return (
    <Paper>
      <nav>
        <Flex gap={"md"}>
          <Group>
            <ThemeIcon>
              <IconNews></IconNews>
            </ThemeIcon>
            <Title>Paper Portal</Title>
          </Group>
          <Group ml={"auto"}>
            <Text>Demo</Text>
          </Group>
        </Flex>
      </nav>
    </Paper>
  );
}
