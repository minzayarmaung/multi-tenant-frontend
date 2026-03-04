import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Role } from "../../data/enums/Role";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: Role[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) return <div>Loading...</div>;

    // Not logged in → redirect to login
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // Logged in but wrong role → redirect to dashboard
    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;