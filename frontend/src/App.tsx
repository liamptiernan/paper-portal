import { Container, Flex } from "@mantine/core";
import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route, Outlet } from "react-router-dom";
import { MainNavBar } from "./components/NavBar";
import { useNavBarStyles } from "./features/portal-form/styles";
import { PublisherDashboard } from "./features/publisher-dashboard/PublisherDashboard";

function AppLayout() {
  const { classes } = useNavBarStyles();
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
      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<PublisherDashboard />}></Route>
        <Route path="/purchase" element={<AdPurchaseForm />}></Route>
      </Route>
    </Routes>
  );
}
