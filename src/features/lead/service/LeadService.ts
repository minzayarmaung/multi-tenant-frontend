import axiosInstance from "../../../config/axiosConfig";
import { ENDPOINTS } from "../../../config/apiConfig";
import type { ApiResponse } from "../../../common/response/ApiResponse";
import type { PaginatedApiResponse } from "../../../common/response/PaginatedApiResponse";
import type { PaginationRequest } from "../../../common/request/PaginationRequest";
import type { LeadResponse } from "../dto/response/LeadResponse";
import { LeadStatus } from "../../../data/enums/LeadStatus";

const LeadService = {

    getCompanyLeads: async (params: PaginationRequest): Promise<PaginatedApiResponse<LeadResponse>> => {
        const response = await axiosInstance.get(ENDPOINTS.LEADS.BASE, { params });
        return response.data;
    },

    getMyLeads: async (params: PaginationRequest): Promise<PaginatedApiResponse<LeadResponse>> => {
        const response = await axiosInstance.get(ENDPOINTS.LEADS.MY, { params });
        return response.data;
    },

    getById: async (id: number): Promise<ApiResponse<LeadResponse>> => {
        const response = await axiosInstance.get(ENDPOINTS.LEADS.BY_ID(id));
        return response.data;
    },

    create: async (data: { name: string; email?: string; phone?: string })
        : Promise<ApiResponse<LeadResponse>> => {
        const response = await axiosInstance.post(ENDPOINTS.LEADS.BASE, data);
        return response.data;
    },

    update: async (id: number, data: { name: string; email?: string; phone?: string })
        : Promise<ApiResponse<LeadResponse>> => {
        const response = await axiosInstance.patch(ENDPOINTS.LEADS.BY_ID(id), data);
        return response.data;
    },

    updateStatus: async (id: number, status: LeadStatus): Promise<ApiResponse<LeadResponse>> => {
        const response = await axiosInstance.patch(ENDPOINTS.LEADS.STATUS(id), { status });
        return response.data;
    },

    assign: async (id: number, userId: number): Promise<ApiResponse<LeadResponse>> => {
        const response = await axiosInstance.patch(ENDPOINTS.LEADS.ASSIGN(id), { userId });
        return response.data;
    },

    delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.delete(ENDPOINTS.LEADS.BY_ID(id));
    return response.data;
},
};

export default LeadService;