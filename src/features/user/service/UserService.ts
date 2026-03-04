import axiosInstance from "../../../config/axiosConfig";
import { ENDPOINTS } from "../../../config/apiConfig";
import type { ApiResponse } from "../../../common/response/ApiResponse";
import type { PaginatedApiResponse } from "../../../common/response/PaginatedApiResponse";
import type { PaginationRequest } from "../../../common/request/PaginationRequest";
import type { UserResponse } from "../dto/response/UserResponse";

const UserService = {

    // Called by SYSTEM_ADMIN
    getAll: async (params: PaginationRequest): Promise<PaginatedApiResponse<UserResponse>> => {
        const response = await axiosInstance.get(ENDPOINTS.USERS.BASE, { params });
        return response.data;
    },

    // Called by COMPANY_ADMIN
    getCompanyUsers: async (params: PaginationRequest): Promise<PaginatedApiResponse<UserResponse>> => {
        const response = await axiosInstance.get(ENDPOINTS.USERS.COMPANY, { params });
        return response.data;
    },

    getById: async (id: number): Promise<ApiResponse<UserResponse>> => {
        const response = await axiosInstance.get(ENDPOINTS.USERS.BY_ID(id));
        return response.data;
    },

    // SYSTEM_ADMIN creates COMPANY_ADMIN
    createCompanyAdmin: async (data: { name: string; email: string; password: string; companyId: number })
            : Promise<ApiResponse<UserResponse>> => {
            const response = await axiosInstance.post(ENDPOINTS.USERS.BASE, data);
            return response.data;
    },

    // COMPANY_ADMIN creates USER
    createMember: async (data: { name: string; email: string; password: string })
        : Promise<ApiResponse<UserResponse>> => {
        const response = await axiosInstance.post(ENDPOINTS.USERS.MEMBERS, data);
        return response.data;
    },

    update: async (id: number, data: { name: string; email: string; password?: string })
        : Promise<ApiResponse<UserResponse>> => {
        const response = await axiosInstance.patch(ENDPOINTS.USERS.BY_ID(id), data);
        return response.data;
    },

    delete: async (id: number): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete(ENDPOINTS.USERS.BY_ID(id));
        return response.data;
    }
};

export default UserService;