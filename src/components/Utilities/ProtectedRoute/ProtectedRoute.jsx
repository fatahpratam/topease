import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, condition, to }) {
  return condition ? <Navigate to={to} replace /> : children;
}