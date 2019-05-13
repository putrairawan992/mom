import PATH_URL from "./path";
import Login from "../pages/Login";
import Home from "../pages/Home";
//import requiredAuth from '../hoc/requiredAuth';
//import notRequiredAuth from "../hoc/notRequiredAuth";
const routes = [
  {
    path: PATH_URL.LOGIN,
    component: Login
  },{
    path: PATH_URL.DASHBOARD,
    component: Home
  }
];

export default routes;
