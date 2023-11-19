import { Button, Stack, Tabs, Title } from "@mantine/core";
import {
  IconBuildingWarehouse,
  IconChevronLeft,
  IconList,
  IconWorldShare,
} from "@tabler/icons-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetPublicationQuery } from "./publications/publicationsApi";

export function PublicationFormHeader() {
  const params = useParams();
  const publicationId = params.publicationId;
  const { data: publication } = useGetPublicationQuery(
    publicationId ?? skipToken
  );

  const navigate = useNavigate();
  const path_match = window.location.pathname.match("edit|ads|integrate");
  const activeTab = path_match ? path_match[0] : "";
  const tabNavigate = (value: string) => {
    navigate(value);
  };
  return (
    <Stack w="100%">
      <Stack spacing={"none"} mt={"lg"} w="800px">
        <Button
          leftIcon={<IconChevronLeft size={".9rem"} />}
          size="small"
          compact
          variant="white"
          color="brandDark.4"
          fw={400}
          w="fit-content"
          onClick={() => navigate("..")}
          styles={(theme) => ({
            root: {
              "&:not([data-disabled])": theme.fn.hover({
                textDecoration: "underline",
              }),
            },
          })}
        >
          All Publications
        </Button>
        <Title mt={"sm"}>{publication?.name}</Title>
        <Tabs radius={"lg"} value={activeTab} onTabChange={tabNavigate}>
          <Tabs.List>
            <Tabs.Tab mr="lg" value="edit" icon={<IconList />}>
              General
            </Tabs.Tab>
            <Tabs.Tab mr="lg" value="ads" icon={<IconBuildingWarehouse />}>
              Ad Units
            </Tabs.Tab>
            <Tabs.Tab mr="lg" value="integrate" icon={<IconWorldShare />}>
              Integrate
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Stack>
      <Outlet />
    </Stack>
  );
}
