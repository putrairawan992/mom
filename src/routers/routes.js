import PATH_URL from "./path";
import Login from "../pages/Login";
import FullLayout from "../layouts/FullLayout";
import MainLayout from "../layouts/MainLayout";
import ProductList from "../pages/ProductList";
import ProductCreate from "../pages/ProductCreate";
import ProductEdit from "../pages/ProductEdit";
import OrderChina from "../pages/OrderChina";
import CustomerList from "../pages/CustomerList";
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

const routes = [
  {
    path: PATH_URL.LOGIN,
    component: Login,
    layout: FullLayout
  },
  {
    path: PATH_URL.PRODUCT,
    component: ProductList,
    layout: MainLayout
  },
  {
    path: PATH_URL.PRODUCT_CREATE,
    component: ProductCreate,
    layout: MainLayout
  },
  {
    path: PATH_URL.PRODUCT_EDIT,
    component: ProductEdit,
    layout: MainLayout
  },
  {
    path: PATH_URL.ORDER,
    component: Order,
    layout: MainLayout
  },
  {
    path: PATH_URL.ORDER_COMPLETED,
    component: "",
    layout: MainLayout
  },
  {
    path: PATH_URL.ORDER_CANCLE,
    component: "",
    layout: MainLayout
  },
  {
    path: PATH_URL.CUSTOMER,
    component: CustomerList,
    layout: MainLayout
  },
  {
    path: PATH_URL.DASHBOARD,
    component: Dashboard,
    layout: MainLayout
  }
];

export default routes;
