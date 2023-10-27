import { Container, Flex } from "@mantine/core";
import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route, Outlet } from "react-router-dom";
import { MainNavBar } from "./components/NavBar";
import { PublisherDashboard } from "./features/publisher-dashboard/PublisherDashboard";
import { useNavBarStyles } from "./components/styles";

function PurchaseLayout() {
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

function AdminLayout() {
  return (
    <>
      <Flex gap={"sm"}>
        <MainNavBar />
        <Outlet />
      </Flex>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/customer" element={<PurchaseLayout />}>
        <Route path="purchase" element={<AdPurchaseForm />}></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<PublisherDashboard />}></Route>
      </Route>
    </Routes>
  );
}
