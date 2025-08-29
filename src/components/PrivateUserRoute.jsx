import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateUserRoute = () => {
    const { userInfo } = useSelector((state) => state.authUser);
    return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateUserRoute