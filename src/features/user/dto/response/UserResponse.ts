export interface UserResponse {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    companyId?: number;
    companyName?: string;
    createdAt: string;
}