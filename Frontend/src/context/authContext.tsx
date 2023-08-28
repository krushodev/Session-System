import { createContext, useContext, useState } from 'react';

import { AuthResponse, User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  saveUser: (data: AuthResponse) => void;
  getUser: () => User | undefined;
  getAccessToken: () => string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | undefined>();
    const [accessToken, setAccessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const saveUser = (data: AuthResponse) => {
        setAccessToken(data.payload.accessToken);
        setUser(data.payload.user);
        setIsAuthenticated(true);
    }
    
    const getAccessToken = () => {
        return accessToken;
    }
    
    const getUser = () => {
        return user;
    }
    
    return(
        <AuthContext.Provider value={{ isAuthenticated, saveUser, getAccessToken, getUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
