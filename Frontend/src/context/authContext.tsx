import { createContext, useContext, useEffect, useState } from 'react';
import { decodeToken, isExpired } from "react-jwt";

import { AuthResponse, User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  saveUserData: (data: AuthResponse) => void;
  getUser: () => User | undefined;
  getAccessToken: () => string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | undefined>();
    const [accessToken, setAccessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const saveUserData = (data: AuthResponse) => {
        const { accessToken, refreshToken } = data.payload;

        localStorage.setItem("token", JSON.stringify(refreshToken));

        setAccessToken(accessToken);

        const decoded: { user: User } | null = decodeToken(accessToken);

        if (decoded?.user) {
            setUser(decoded.user);
            setIsAuthenticated(true);
        }
    }
    
    const getAccessToken = () => {
        return accessToken;
    }
    
    const getUser = () => {
        return user;
    }

    const resolveWithExistentData = async() => {
        const refreshToken = JSON.parse(localStorage.getItem("token")!);

        const isTokenExpired = isExpired(refreshToken);

        if (!isTokenExpired) {
            try {

                const response = await fetch("http://localhost:8085/api/sessions/refresh-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ refreshToken })
                })
    
                const data: AuthResponse = await response.json();
    
                const { accessToken } = data.payload;
    
                const decoded: { user: User } | null = decodeToken(accessToken);
    
                if (decoded?.user) {
                    setAccessToken(accessToken);
                    setUser(decoded.user);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        if (!accessToken) {
            resolveWithExistentData();
        }
    }, [accessToken]);
    
    return(
        <AuthContext.Provider value={{ isAuthenticated, saveUserData, getAccessToken, getUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
