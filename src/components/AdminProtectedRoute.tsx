import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const isAdminAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  const userName = localStorage.getItem("userName");
  if (!token || !userName) {
    toast.error("Session expired. Please sign in again.");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    return false;
  }
  try {
    const decodedToken: { isAdmin: boolean; exp: number } = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      toast.error("Session expired. Please sign in again.");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      return false;
    }
    if (!decodedToken.isAdmin) {
      toast.error("You are not authorized to access this page.");
      return false;
    }
    toast.success(`Welcome back ${userName}`);
    return true;
  } catch (error) {
    toast.error("Invalid session. Please sign in again.");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    return false;
  }
};
const ProtectedAdminRoute = () => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedAdminRoute;
