import { Box, Container } from "@mantine/core";
import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route, Outlet } from "react-router-dom";
import { MainNavBar } from "./components/NavBar";

function AppLayout() {
  return (
    <>
      <Container
        fluid
        p={0}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          marginBottom: "2rem",
        }}
      >
        <Box style={{ borderBottom: "1px solid #ccc" }}>
          <Container fluid size="xl">
            <MainNavBar />
          </Container>
        </Box>
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
