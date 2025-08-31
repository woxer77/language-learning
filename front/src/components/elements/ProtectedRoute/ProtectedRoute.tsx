import { Outlet, Navigate } from "react-router-dom";

import { useAppSelector } from "../../../hooks/common/redux";

const ProtectedRoute = () => {
  const isAuth = useAppSelector(state => state.userReducer.isAuth);

  return (isAuth ? <Outlet /> : <Navigate to='/login' />);
};

export default ProtectedRoute;
