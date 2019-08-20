import PATH_URL from "./path";
import Login from "../pages/Login";
import FullLayout from "../layouts/FullLayout";
import MainLayout from "../layouts/MainLayout";
import ProductList from "../containers/ProductList";
import FormProduct from "../containers/Form";

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
    component: FormProduct,
    layout: MainLayout
  },
  {
    path: PATH_URL.PRODUCT_EDIT,
    component: FormProduct,
    layout: MainLayout
  }
];

export default routes;
