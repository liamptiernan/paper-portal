import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./features/home/HomePage";
import {
  AdminLayout,
  AuthAdminLayout,
  PurchaseLayout,
} from "./features/app-layout/AppLayout";
import {
  AuthPublisherDashboard,
  PublisherDashboard,
} from "./features/publisher-dashboard/PublisherDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />;
      <Route path="/customer" element={<PurchaseLayout />}>
        <Route path="purchase" element={<AdPurchaseForm />}></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AuthPublisherDashboard />}></Route>
      </Route>
    </Routes>
  );
}
