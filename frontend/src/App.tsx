import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./features/home/HomePage";
import { AdminLayout, PurchaseLayout } from "./features/app-layout/AppLayout";
import { PublicationEditPage } from "./features/publisher-dashboard/publications/PublicationEditPage";
import { AuthPublisherDashboard } from "./features/publisher-dashboard/publications/PublicationsDashboard";
import { PublicationFormHeader } from "./features/publisher-dashboard/PublicationHeader";
import { AdTablePage } from "./features/publisher-dashboard/ads/PublicationAdTablePage";
import { AdOfferingEditPage } from "./features/publisher-dashboard/ads/PublicationAdEditPage";
import { ErrorPage } from "./components/ErrorPage";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<HomePage />} />;
      <Route path="/customer" element={<PurchaseLayout />}>
        <Route path="purchase" element={<AdPurchaseForm />}></Route>
      </Route>
      <Route path="/publisher" element={<AdminLayout />}>
        <Route path="publications">
          <Route index element={<AuthPublisherDashboard />} />
          <Route path=":publicationId" element={<PublicationFormHeader />}>
            <Route path="edit" element={<PublicationEditPage />} />
            <Route path="ads">
              <Route index element={<AdTablePage />} />
              <Route path=":offeringId" element={<AdOfferingEditPage />} />
            </Route>
            <Route path="integrate" element={<PublicationEditPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
