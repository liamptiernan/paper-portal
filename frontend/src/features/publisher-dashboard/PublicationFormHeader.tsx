import { Stack, Tabs, Title } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";

export function PublicationFormHeader() {
  const navigate = useNavigate();
  const activeTab = "/general";

  const tabNavigate = (value: string) => {
    navigate(value);
  };
  return (
    <Stack>
      back
      <Title>Publication Name</Title>
      <Tabs value={activeTab} onTabChange={tabNavigate}>
        <Tabs.List>
          <Tabs.Tab value="/general">General</Tabs.Tab>
          <Tabs.Tab value="../ads">Ad Units</Tabs.Tab>
          <Tabs.Tab value="/integrate">Integrate</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Outlet></Outlet>
    </Stack>
  );
}
