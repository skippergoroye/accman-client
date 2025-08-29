import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedAdminLayout() {
  const { adminInfo } = useSelector((state) => state.authAdmin);

  return adminInfo ? <Outlet /> : <Navigate to="/backoffice" replace />;
}

export default ProtectedAdminLayout;
