import { Navigate } from "react-router-dom";
import { useAuth } from "../../../security/hooks/useAuth";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center
                                    w-14 h-14 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                        <BuildingIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-white">LeadFlow</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Multi-Tenant Lead Management
                    </p>
                </div>

                {/* Card */}
                <div className="bg-slate-800 border border-slate-700
                                rounded-2xl shadow-2xl p-8">
                    <h2 className="text-lg font-semibold text-white mb-6">
                        Sign in to your account
                    </h2>
                    <LoginForm />
                </div>

                <p className="text-center text-slate-500 text-xs mt-6">
                    © 2026 LeadFlow. All rights reserved.
                </p>
            </div>
        </div>
    );
};

const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white"
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2
                 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1
                 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

export default LoginPage;