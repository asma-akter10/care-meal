import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/authService";
import type { User } from "../types/user";

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (payload: RegisterPayload) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("careMealToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        localStorage.removeItem("careMealToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("careMealToken", data.token);
      setUser(data.user);
      return data.user;
    } catch (error: any) {
      console.error("Login error:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Login failed");
      return null;
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const data = await registerUser(payload);
      localStorage.setItem("careMealToken", data.token);
      setUser(data.user);
      return data.user;
    } catch (error: any) {
      console.error("Register error:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Registration failed");
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("careMealToken");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};