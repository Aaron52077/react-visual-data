import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const Error = lazy(() => import("@/pages/404"));

export default [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/error/404",
    component: Error
  }
];
