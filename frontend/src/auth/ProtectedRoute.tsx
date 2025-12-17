import { Navigate } from "react-router-dom";
import { useContext, type JSX } from "react";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or a spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
