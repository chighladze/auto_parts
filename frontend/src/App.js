import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminRoute,
  ProtectedRoute,
  PublicRoute,
} from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ViewProfilePage from "./pages/ViewProfilePage";

// Импортируем наши страницы для управления складами запчастей
import BrandsPage from "./pages/BrandsPage";
import InventoryPage from "./pages/InventoryPage";
import LowStockPage from "./pages/LowStockPage";
import PartDetailPage from "./pages/PartDetailPage";
import PartGroupsPage from "./pages/PartGroupsPage";
import PartsManagementPage from "./pages/PartsManagementPage";
import PartsPage from "./pages/PartsPage";
import PartSubgroupsPage from "./pages/PartSubgroupsPage";
import ScannerPage from "./pages/ScannerPage";
import SearchPartPage from "./pages/SearchPartPage";
import SectionPage from "./pages/SectionPage";
import WarehousePage from "./pages/WarehousePage";

import { I18nextProvider } from "react-i18next";
import "./assets/css/breadcrumbs.css";
import "./assets/css/themes.css";
import i18n from "./i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <BrowserRouter>
          <RouteScrollToTop />
          <Routes>
            {/* Public routes (accessible to all) */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<SignInPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>

            {/* Protected routes (require authentication) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/warehouses" element={<WarehousePage />} />
              <Route path="/sections" element={<SectionPage />} />
              <Route path="/parts" element={<PartsPage />} />
              <Route path="/parts/:id" element={<PartDetailPage />} />
              <Route
                path="/section/:sectionId/parts"
                element={<PartsManagementPage />}
              />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/search-parts" element={<SearchPartPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/part-groups" element={<PartGroupsPage />} />
              <Route path="/part-subgroups" element={<PartSubgroupsPage />} />
              <Route path="/low-stock" element={<LowStockPage />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/profile" element={<ViewProfilePage />} />
              {/* Catch all route for 404 - must be inside protected routes */}
              <Route path="*" element={<ErrorPage />} />
            </Route>

            {/* Admin routes (require admin permission) */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/users" element={<AdminUsersPage />} />
            </Route>

            {/* Special routes */}
            <Route path="/access-denied" element={<AccessDeniedPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
