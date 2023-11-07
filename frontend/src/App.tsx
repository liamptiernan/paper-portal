import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./features/home/HomePage";
import { AdminLayout, PurchaseLayout } from "./features/app-layout/AppLayout";
import {
  AuthPublisherDashboard,
  PublisherDashboardHeader,
} from "./features/publisher-dashboard/PublisherDashboard";
import { PublicationCreatePage } from "./features/publisher-dashboard/PublicationForm";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />;
      <Route path="/customer" element={<PurchaseLayout />}>
        <Route path="purchase" element={<AdPurchaseForm />}></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<PublisherDashboardHeader />}>
          <Route
            path="publications/create"
            element={<PublicationCreatePage />}
          />
          <Route path="publications/" element={<AuthPublisherDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
