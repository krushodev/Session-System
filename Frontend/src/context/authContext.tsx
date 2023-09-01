import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";

import { AuthResponse, User } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  saveUserData: (data: AuthResponse) => void;
  getUser: () => User | undefined;
  getAccessToken: () => string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const saveUserData = (data: AuthResponse) => {
    const { accessToken, refreshToken } = data.payload;

    const decodedAccessToken: { user: User } | null = decodeToken(accessToken);
    const decodedRefreshToken: { user: { id: string } } | null = decodeToken(refreshToken);

    if (decodedAccessToken?.user && decodedRefreshToken?.user.id) {
      setAccessToken(accessToken);
      localStorage.setItem("token", JSON.stringify(refreshToken));
      setUser(decodedAccessToken.user);
      setIsAuthenticated(true);
    }
  };

  const getAccessToken = () => {
    return accessToken;
  };

  const getUser = () => {
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setAccessToken("");
    setIsAuthenticated(false);
  };

  const checkData = async () => {
    const refreshToken = JSON.parse(localStorage.getItem("token")!);

    if (!refreshToken || isExpired(refreshToken)) {
      setLoading(false);

      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/sessions/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data: AuthResponse = await response.json();

      if (!data.payload.accessToken) {
        return alert("No se pudo obtener el token");
      }

      const { accessToken } = data.payload;

      const decoded: { user: User } | null = decodeToken(accessToken);

      setAccessToken(accessToken);
      setUser(decoded!.user);
      setIsAuthenticated(true);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkData();
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, saveUserData, getAccessToken, getUser, logout }}>{loading ? <h2>Cargando datos...</h2> : children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
