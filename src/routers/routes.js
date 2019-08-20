import PATH_URL from "./path";
import Login from "../pages/Login";
import FullLayout from "../layouts/FullLayout";
import MainLayout from "../layouts/MainLayout";
import ProductList from "../pages/ProductList";
import ProductCreate from "../pages/ProductCreate";
import ProductEdit from "../pages/ProductEdit";

const routes = [
  {
    path: PATH_URL.LOGIN,
    component: Login,
    layout: FullLayout
  },
  {
    path: PATH_URL.PRODUCT_LIST,
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
  }
];

export default routes;
