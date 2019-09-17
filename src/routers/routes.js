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
import FormProduct from "../containers/NewFormProduct";

const routes = [
  {
    path: PATH_URL.LOGIN,
    component: Login,
    layout: FullLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.PRODUCT,
    component: ProductList,
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.PRODUCT_CREATE,
    component: ProductCreate,
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.PRODUCT_EDIT,
    component: ProductEdit,
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.ORDER,
    component: Order,
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.ORDER_COMPLETED,
    component: "",
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.ORDER_CANCLE,
    component: "",
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.CUSTOMER,
    component: CustomerList,
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.DASHBOARD,
    component: Dashboard,
    layout: MainLayout,
    needAuthenticated: true
  },
  {
    path: "/development",
    component: FormProduct,
    layout: MainLayout,
    needAuthenticated: false
  }
];

export default routes;
