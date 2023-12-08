import { Flex, Indicator, NavLink, Navbar, ThemeIcon } from "@mantine/core";
import { useNavBarStyles } from "./styles";
import {
  IconBuildingCommunity,
  IconBuildingWarehouse,
  IconDoorExit,
  IconHelp,
  IconNews,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { setAccountModalOpen } from "../app/globalSlice";
import { useUserInviteNotify } from "../features/users/user-invites/useUserInviteNotification";

function MainNavLinks() {
  const path_match = window.location.pathname.match(
    "publications|purchases|users"
  );
  const activeLink = path_match ? path_match[0] : "";
  return (
    <>
      <NavLink
        component="a"
        icon={<IconNews />}
        label="Publications"
        href="/publisher/publications"
        active={activeLink === "publications"}
        variant="subtle"
      />
      <NavLink
        component="a"
        icon={<IconBuildingWarehouse />}
        label="Purchases"
        href="/publisher/purchases"
        active={activeLink === "purchases"}
        variant="subtle"
      />
      <NavLink
        component="a"
        icon={<IconUsersGroup />}
        label="Users"
        href="/publisher/users"
        active={activeLink === "users"}
        variant="subtle"
      />
    </>
  );
}

function FooterNavLinks() {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  useUserInviteNotify();
  // must be verified to accept!

  const handleOpen = useCallback(() => {
    dispatch(setAccountModalOpen(true));
  }, [dispatch]);
  return (
    <>
      <NavLink component="a" icon={<IconHelp />} label="Help" />
      <NavLink
        onClick={() => logout()}
        component="a"
        icon={<IconDoorExit />}
        label="Log out"
      />
      <NavLink
        onClick={() => handleOpen()}
        component="a"
        icon={
          <Indicator>
            <IconUser />
          </Indicator>
        }
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
