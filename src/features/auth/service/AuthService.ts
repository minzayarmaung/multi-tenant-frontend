import axiosInstance from "../../../config/axiosConfig";
import { ENDPOINTS } from "../../../config/apiConfig";
import type { ApiResponse } from "../../../common/response/ApiResponse";
import type { LoginResponse } from "../dto/response/LoginResponse";

const AuthService = {
    
    login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
        const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, { email, password });
        console.log(ENDPOINTS.AUTH.LOGIN)
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
    },

    refresh: async (): Promise<void> => {
        await axiosInstance.post(ENDPOINTS.AUTH.REFRESH);
    }
};

export default AuthService;