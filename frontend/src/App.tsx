import { Container } from "@mantine/core";
import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route, Outlet } from "react-router-dom";
import { MainNavBar } from "./components/NavBar";
import { useNavBarStyles } from "./features/portal-form/styles";

function AppLayout() {
  const { classes } = useNavBarStyles();
  return (
    <>
      <Container fluid className={classes.navContainer}>
        <MainNavBar />
      </Container>
      <Container size="xl">
        <Outlet />
      </Container>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="purchase" element={<AdPurchaseForm />}></Route>
      </Route>
    </Routes>
  );
}
