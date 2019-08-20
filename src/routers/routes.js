import PATH_URL from "./path";
import Login from "../pages/Login";
import Home from "../pages/Home";
import requiredAuth from '../hoc/requiredAuth';
import notRequiredAuth from "../hoc/notRequiredAuth";
import FullLayout from "../layouts/FullLayout";
import MainLayout from "../layouts/MainLayout";
import DashboardChina from "../pages/DashboardChina";
//import MainLayout from "../layouts/MainLayout";

const routes = [
  {
    path: PATH_URL.LOGIN,
    component: Login,
    layout: FullLayout
  },
  {
    path: PATH_URL.HOME,
    component: Home,
    layout: MainLayout
  },
  {
    path: PATH_URL.DASHBOARD_CHINA,
    component: DashboardChina,
    layout: MainLayout
  },
  {
    path: PATH_URL.DASHBOARD_INDONESIA,
    component: DashboardChina,
    layou: MainLayout
  },

];

export default routes;
