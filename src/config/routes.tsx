// import { lazy } from "react";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { APP, AUTH, DASHBOARD, LOGIN, ORGANIZATION } from "./path";
import { AppLayout, PublicLayout } from "~/components/layouts";
// import { Loadable } from '~/components';
const Dashboard = lazy(() => import("~/pages/dashboard"));
const Login = lazy(() => import("~/pages/login"));
const NotFoundPage = lazy(() => import("~/pages/404"));
const Organization = lazy(() => import("~/pages/organization"));
const Users = lazy(() => import("~/pages/users/Users"));

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
  element: <NotFoundPage />,
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
    {
      path: `users`,
      element: <Users />,
    },
    {
      path: ORGANIZATION,
      element: <Organization />,
    },
    {
      path: `${ORGANIZATION}/:id`,
      element: <Users />,
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
