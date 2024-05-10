import { Flex } from "@mantine/core";
import { MainNavBar } from "../../components/NavBar";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { AccountModal } from "../../components/AccountModal";

export function AdminLayout() {
  return (
    <>
      <Flex gap={"sm"}>
        <MainNavBar />
        <Outlet />
      </Flex>
      <AccountModal />
    </>
  );
}

export const AuthAdminLayout = withAuthenticationRequired(AdminLayout);
