import { Flex, NavLink, Navbar, ThemeIcon } from "@mantine/core";
import { useNavBarStyles } from "./styles";
import {
  IconBuildingCommunity,
  IconBuildingWarehouse,
  IconDoorExit,
  IconNews,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { setAccountModalOpen } from "../app/globalSlice";

function MainNavLinks() {
  return (
    <>
      <NavLink
        component="a"
        icon={<IconNews />}
        label="Publications"
        href="/publisher/publications"
      />
      <NavLink
        component="a"
        icon={<IconBuildingWarehouse />}
        label="Purchases"
      />
      <NavLink component="a" icon={<IconUsersGroup />} label="Users" />
    </>
  );
}

function FooterNavLinks() {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();

  const handleOpen = useCallback(() => {
    dispatch(setAccountModalOpen(true));
  }, [dispatch]);
  return (
    <>
      <NavLink
        onClick={() => logout()}
        component="a"
        icon={<IconDoorExit />}
        label="Log out"
      />
      <NavLink
        onClick={() => handleOpen()}
        component="a"
        icon={<IconUser />}
        label="Account"
      />
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
