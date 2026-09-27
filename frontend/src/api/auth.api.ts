import api from "./api";
import type { AuthResponse, RegisterData, LoginData } from "../types/auth";


export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);

    return response.data;
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);

    return response.data;
}

export const logoutUser = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
}

export const getCurrentUser = async (): Promise<AuthResponse> => {
    const response = await api.get("/auth/me");

    return response.data;
}