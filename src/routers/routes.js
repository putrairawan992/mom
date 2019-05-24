import PATH_URL from "./path";
import Login from "../pages/Login";
import Home from "../pages/Home";
import requiredAuth from '../hoc/requiredAuth';
import notRequiredAuth from "../hoc/notRequiredAuth";
//import MainLayout from "../layouts/MainLayout";

const routes = [
  {
    path: PATH_URL.LOGIN,
    component: notRequiredAuth(Login),
    layoutName: 'fullLayout'
  },
  {
    path: PATH_URL.HOME,
    component: requiredAuth(Home)
  }
];

export default routes;
