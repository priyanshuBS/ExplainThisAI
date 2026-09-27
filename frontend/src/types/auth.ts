export interface RegisterData {
    email: string;
    password: string;
    name?: string
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string | null;
    email: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>
}