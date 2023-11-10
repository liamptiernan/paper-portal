import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./features/home/HomePage";
import { AdminLayout, PurchaseLayout } from "./features/app-layout/AppLayout";
import { PublicationEditPage } from "./features/publisher-dashboard/publications/PublicationEditPage";
import { AuthPublisherDashboard } from "./features/publisher-dashboard/publications/PublicationsDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />;
      <Route path="/customer" element={<PurchaseLayout />}>
        <Route path="purchase" element={<AdPurchaseForm />}></Route>
      </Route>
      <Route path="/publisher" element={<AdminLayout />}>
        <Route path="publications">
          <Route index element={<AuthPublisherDashboard />} />
          {/* <Route path="create" element={<PublicationCreatePage />} /> */}
          <Route path=":publicationId">
            <Route path="edit" element={<PublicationEditPage />} />
          </Route>
          <Route path="ads" element={<PublicationEditPage />} />
          <Route path="integrate" element={<PublicationEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
