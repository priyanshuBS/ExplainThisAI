import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { User, AuthContextType, LoginData, RegisterData } from "../types/auth";
import { getCurrentUser, registerUser, loginUser, logoutUser } from "../api/auth.api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCurrentUser();

                if (response.success) {
                    setUser(response.data);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    const login = async (data: LoginData) => {
        const response = await loginUser(data);

        if (response.success) {
            setUser(response.data);
        }
    }

    const register = async (data: RegisterData) => {
        const response = await registerUser(data);

        if (response.success) {
            setUser(response.data);
        }
    }

    const logout = async () => {
        await logoutUser();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("use auth must be defined inside authprovider")
    }

    return context;
}