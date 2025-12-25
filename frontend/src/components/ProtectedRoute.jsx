import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedRoute({ roles, children }) {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/" />;

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/" />;
  }

  return children;
}
