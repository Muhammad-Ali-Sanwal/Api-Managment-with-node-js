import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const Navigate = useNavigate();
  const name = localStorage.getItem("userName");
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    Navigate("/login");
  };

  return (
    <div>
      <p>Welcome back {name}</p>
      <button
        className="px-8 py-2 border-4 border-red-700 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;
