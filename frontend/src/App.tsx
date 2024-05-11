import { AdPurchaseForm } from "./features/portal-form/AdPurchaseForm";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthHomePage } from "./features/home/HomePage";
import { AdminLayout } from "./features/app-layout/AppLayout";
import { PublicationEditPage } from "./features/publisher-dashboard/publications/PublicationEditPage";
import { PublicationsDashboard } from "./features/publisher-dashboard/publications/PublicationsDashboard";
import { PublicationFormHeader } from "./features/publisher-dashboard/PublicationHeader";
import { AdTablePage } from "./features/publisher-dashboard/ads/PublicationAdTablePage";
import { AdOfferingEditPage } from "./features/publisher-dashboard/ads/PublicationAdEditPage";
import { ErrorPage } from "./components/ErrorPage";
import { PurchasesDashboard } from "./features/publisher-dashboard/purchases/PurchasesDashboard";
import { UsersDashboard } from "./features/users/UsersDashboard";
import { IntegrateTab } from "./features/publisher-dashboard/publications/IntegrateTab";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { FormStepperLayout } from "./features/portal-form/layout/Stepper";
import { PurchaseConfirmation } from "./features/portal-form/stripe/Confirmation";

const AuthAdminLayout = ProtectedRoute(AdminLayout);

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<AuthHomePage />} />;
      <Route path="/purchase" element={<FormStepperLayout />}>
        <Route path=":publicationId" element={<AdPurchaseForm />} />
        <Route path="complete" element={<PurchaseConfirmation />} />
      </Route>
      <Route path="/publisher" element={<AuthAdminLayout />}>
        <Route path="publications">
          <Route index element={<PublicationsDashboard />} />
          <Route path=":publicationId" element={<PublicationFormHeader />}>
            <Route path="edit" element={<PublicationEditPage />} />
            <Route path="ads">
              <Route index element={<AdTablePage />} />
              <Route path=":offeringId" element={<AdOfferingEditPage />} />
            </Route>
            <Route path="integrate" element={<IntegrateTab />} />
          </Route>
        </Route>
        <Route path="purchases" element={<PurchasesDashboard />} />
        <Route path="users" element={<UsersDashboard />} />
        <Route
          path=""
          element={<Navigate replace to="/publisher/publications" />}
        />
      </Route>
    </Routes>
  );
}
