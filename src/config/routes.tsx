// import { lazy } from "react";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { APP, AUTH, DASHBOARD, LOGIN } from "./path";
import { AppLayout, PublicLayout } from "~/components/layouts";
// import { Loadable } from '~/components';
const Dashboard = lazy(() => import("~/pages/dashboard"));
const Login = lazy(() => import("~/pages/login"));

const authRoutes: RouteObject = {
  path: "auth",
  element: <PublicLayout />,
  children: [
    { index: true, element: <Login /> },
    { path: "login", element: <Login /> },
    { path: "register", element: <></> },
  ],
};

const notFoundRoutes: RouteObject = {
  path: "*",
  element: <></>,
};

const appRoutes: RouteObject = {
  path: APP,
  element: <AppLayout />,
  children: [
    {
      index: true,
      path: DASHBOARD,
      element: <Dashboard />,
    },
    notFoundRoutes,
  ],
};
const routes: RouteObject[] = [
  { path: "/", element: <Navigate to={`${APP}/${DASHBOARD}`} /> },
  { path: "/auth", element: <Navigate to={`${AUTH}/${LOGIN}`} /> },
  authRoutes,
  appRoutes,
  notFoundRoutes,
];
export default routes;
