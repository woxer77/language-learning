import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { checkAuth } from "./redux/slices/userSlice";

import useLazy from "./hooks/common/useLazy";
import ProtectedRoute from "./components/elements/ProtectedRoute/ProtectedRoute";
import { useAppDispatch } from "./hooks/common/redux";

const AppRoutes: React.FC = () => {
  const RegistrationLazy = useLazy(() => import("./components/pages/Registration/Registration"));
  const LoginLazy = useLazy(() => import("./components/pages/Login/Login"));
  const EnterLinkLazy = useLazy(() => import("./components/pages/EnterLink/EnterLink"));
  const HomeLazy = useLazy(() => import("./components/pages/Home/Home"));

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginLazy />,
    },
    {
      path: "/registration",
      element: <RegistrationLazy />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/enter-link",
          element: <EnterLinkLazy />,
        },
        {
          path: "/",
          element: <HomeLazy />,
        },
        {
          path: "*",
          element: <div>This page does not exist</div>,
        },
      ]
    }
  ]);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('accessToken')) { // TODO: IMPORTANT! MAKE ANOTHER TRY OF DOING REQUEST BLOCK LOADING
      dispatch(checkAuth());
    }
  }, []);

  return (
    <RouterProvider router={router} />
  );
};

export default AppRoutes;
