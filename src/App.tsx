import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import RootComponent from "./components";
import ProtectedAdminRoute from "./components/AdminProtectedRoute";
import Admin from "./components/fetchAPIs/Admin/Admin";

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<RootComponent />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
