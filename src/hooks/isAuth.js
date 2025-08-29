import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useAuth() {
  const { userInfo, token } = useSelector((state) => state.auth);
  // console.log(user, userAuthToken);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!(user && userAuthToken)
  );

  //   console.log({ userAuthToken });
  // monitor if the auth state changes
  useEffect(() => {
    setIsAuthenticated(!!(user && userAuthToken));
  }, [user, userAuthToken]);

  return isAuthenticated;
}

export default useAuth;
