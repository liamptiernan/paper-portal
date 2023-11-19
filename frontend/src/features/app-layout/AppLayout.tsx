import { Container, Flex } from "@mantine/core";
import { AdPurchaseForm } from "../portal-form/AdPurchaseForm";
import { MainNavBar } from "../../components/NavBar";
import { useNavBarStyles } from "../portal-form/styles";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { AccountModal } from "../../components/AccountModal";

export function PurchaseLayout() {
  const { classes } = useNavBarStyles();
  return (
    <>
      <Container fluid className={classes.navContainer}>
        <MainNavBar />
      </Container>
      <Container size="xl">
        <AdPurchaseForm />
      </Container>
    </>
  );
}

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
