import { Button, Stack, Tabs, Title } from "@mantine/core";
import {
  IconBuildingWarehouse,
  IconChevronLeft,
  IconList,
  IconWorldShare,
} from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";

export function PublicationFormHeader() {
  const navigate = useNavigate();
  const activeTab = "../create";

  const tabNavigate = (value: string) => {
    navigate(value);
  };
  return (
    <Stack spacing={"none"} mt={"lg"} w="800px">
      <Button
        leftIcon={<IconChevronLeft size={".9rem"} />}
        size="small"
        compact
        variant="white"
        color="brandDark.4"
        fw={400}
        w="fit-content"
        onClick={() => navigate("../../publications")}
        styles={(theme) => ({
          root: {
            "&:not([data-disabled])": theme.fn.hover({
              textDecoration: "underline",
            }),
          },
        })}
      >
        Back
      </Button>
      <Title mt={"sm"}>Publication Name</Title>
      <Tabs radius={"lg"} value={activeTab} onTabChange={tabNavigate}>
        <Tabs.List>
          <Tabs.Tab mr="lg" value="../create" icon={<IconList />}>
            General
          </Tabs.Tab>
          <Tabs.Tab mr="lg" value="../ads" icon={<IconBuildingWarehouse />}>
            Ad Units
          </Tabs.Tab>
          <Tabs.Tab mr="lg" value="../integrate" icon={<IconWorldShare />}>
            Integrate
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Outlet></Outlet>
    </Stack>
  );
}
