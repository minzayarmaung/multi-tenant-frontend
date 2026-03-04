import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Role } from "../data/enums/Role";
import ProtectedRoute from "../security/guards/ProtectedRoute";

import LoginPage      from "../features/auth/pages/LoginPage";
import DashboardPage  from "../features/dashboard/pages/DashboardPage";
import CompanyPage    from "../features/company/pages/CompanyPage";
import UserPage       from "../features/user/pages/UserPage";
import LeadPage       from "../features/lead/pages/LeadPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route path="/login" element={<LoginPage />} />

                {/* All authenticated roles */}
                <Route path="/dashboard" element={
                    <ProtectedRoute allowedRoles={[Role.SYSTEM_ADMIN, Role.COMPANY_ADMIN, Role.USER]}>
                        <DashboardPage />
                    </ProtectedRoute>
                }/>

                {/* SYSTEM_ADMIN only */}
                <Route path="/companies" element={
                    <ProtectedRoute allowedRoles={[Role.SYSTEM_ADMIN]}>
                        <CompanyPage />
                    </ProtectedRoute>
                }/>

                {/* SYSTEM_ADMIN + COMPANY_ADMIN */}
                <Route path="/users" element={
                    <ProtectedRoute allowedRoles={[Role.SYSTEM_ADMIN, Role.COMPANY_ADMIN]}>
                        <UserPage />
                    </ProtectedRoute>
                }/>

                {/* COMPANY_ADMIN + USER */}
                <Route path="/leads" element={
                    <ProtectedRoute allowedRoles={[Role.COMPANY_ADMIN, Role.USER]}>
                        <LeadPage />
                    </ProtectedRoute>
                }/>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;