import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    setUser(null);
  } finally {
    setLoading(false);
  }
}, []);

const login = (token: string) => {
  const decoded: any = jwtDecode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(decoded));

  setUser(decoded);
};

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
