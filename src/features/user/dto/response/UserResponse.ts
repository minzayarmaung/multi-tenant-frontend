import type { Role } from "../../../../data/enums/Role";

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: string;
    companyId?: number;
    companyName?: string;
    createdAt: string;
}