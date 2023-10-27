import { Flex, NavLink, Navbar, ThemeIcon } from "@mantine/core";
import { useNavBarStyles } from "./styles";
import {
  IconBuildingCommunity,
  IconBuildingWarehouse,
  IconDoorExit,
  IconNews,
  IconUser,
} from "@tabler/icons-react";

function MainNavLinks() {
  return (
    <>
      <NavLink component="a" icon={<IconNews />} label="Publications" />
      <NavLink component="a" icon={<IconBuildingWarehouse />} label="Ads" />
    </>
  );
}

function FooterNavLinks() {
  return (
    <>
      <NavLink component="a" icon={<IconDoorExit />} label="Log out" />
      <NavLink component="a" icon={<IconUser />} label="Account" />
    </>
  );
}

export function MainNavBar() {
  const { classes } = useNavBarStyles();
  return (
    <Navbar width={{ base: 150 }} className={classes.navContainer}>
      <Navbar.Section>
        <Flex align="flex-end" mx="sm" mb="lg" mt="sm">
          <ThemeIcon variant="white" size={"xl"}>
            <IconBuildingCommunity size="3rem" />
          </ThemeIcon>
        </Flex>
      </Navbar.Section>
      <Navbar.Section grow>
        <MainNavLinks />
      </Navbar.Section>
      <Navbar.Section>
        <FooterNavLinks />
      </Navbar.Section>
    </Navbar>
  );
}
