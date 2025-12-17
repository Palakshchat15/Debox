import { Navigate } from "react-router-dom";
import { useContext, type JSX } from "react";
import { AuthContext } from "./AuthContext";

export default function MasterRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user || user.role !== "master") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
