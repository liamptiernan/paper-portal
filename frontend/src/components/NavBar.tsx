import {
  Flex,
  Indicator,
  NavLink,
  Navbar,
  UnstyledButton,
} from "@mantine/core";
import { useNavBarStyles } from "./styles";
import {
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
import { useGetInvitesByUserQuery } from "../features/users/usersApi";
import { useNavigate } from "react-router-dom";

function MainNavLinks() {
  const { classes } = useNavBarStyles();
  const path_match = window.location.pathname.match(
    "publications|purchases|users"
  );
  const activeLink = path_match ? path_match[0] : "";
  return (
    <>
      <NavLink
        classNames={{
          body: classes.navLinkBody,
          icon: classes.navLinkIcon,
        }}
        component="a"
        color="brandYellow.2"
        icon={<IconNews />}
        label="Publications"
        href="/publisher/publications"
        active={activeLink === "publications"}
        variant="filled"
      />
      <NavLink
        classNames={{
          body: classes.navLinkBody,
          icon: classes.navLinkIcon,
        }}
        color="brandYellow.2"
        component="a"
        icon={<IconBuildingWarehouse />}
        label="Purchases"
        href="/publisher/purchases"
        active={activeLink === "purchases"}
        variant="filled"
      />
      <NavLink
        component="a"
        classNames={{
          body: classes.navLinkBody,
          icon: classes.navLinkIcon,
        }}
        color="brandYellow.2"
        icon={<IconUsersGroup />}
        label="Users"
        href="/publisher/users"
        active={activeLink === "users"}
        variant="filled"
      />
    </>
  );
}

function FooterNavLinks() {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { data: userInvites } = useGetInvitesByUserQuery();
  const { classes } = useNavBarStyles();

  const handleOpen = useCallback(() => {
    dispatch(setAccountModalOpen(true));
  }, [dispatch]);
  return (
    <>
      <NavLink
        classNames={{
          body: classes.navLinkBody,
          icon: classes.navLinkIcon,
        }}
        component="a"
        icon={<IconHelp />}
        label="Help"
      />
      <NavLink
        classNames={{
          body: classes.navLinkBody,
          icon: classes.navLinkIcon,
        }}
        onClick={() => logout()}
        component="a"
        icon={<IconDoorExit />}
        label="Log out"
      />
      <NavLink
        classNames={{
          body: classes.navLinkBody,
          icon: classes.navLinkIcon,
        }}
        onClick={() => handleOpen()}
        component="a"
        icon={
          <Indicator disabled={!(userInvites && userInvites.count > 0)}>
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
  const navigate = useNavigate();
  useUserInviteNotify();
  return (
    <Navbar width={{ base: 150 }} className={classes.navContainer}>
      <Navbar.Section>
        <Flex justify="center">
          <UnstyledButton component={"a"} onClick={() => navigate("/")}>
            <img
              width="80px"
              height="80px"
              src="../../../public/header-logo.svg"
            />
          </UnstyledButton>
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
