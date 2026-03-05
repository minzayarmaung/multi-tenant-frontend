export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN:   "/auth/login",
        LOGOUT:  "/auth/logout",
        REFRESH: "/auth/refresh",
    },
    // Companies
    COMPANIES: {
        BASE:   "/companies",
        BY_ID:  (id: number) => `/companies/${id}`,
    },
    // Users
    USERS: {
        BASE:       "/users",
        MEMBERS:    "/users/members",
        COMPANY:    "/users/company",
        BY_ID:      (id: number) => `/users/${id}`,
    },
    // Leads
    LEADS: {
        BASE:       "/leads",
        MY:         "/leads/my",
        BY_ID:      (id: number) => `/leads/${id}`,
        STATUS:     (id: number) => `/leads/${id}/status`,
        ASSIGN:     (id: number) => `/leads/${id}/assign`,
    },
    // Dashboard
    DASHBOARD: {
        BASE: "/dashboard",
    }
};