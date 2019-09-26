const LOGIN = '/login';
const DASHBOARD = `/dashboard`;
const PRODUCT = `/product`;
const PRODUCT_CREATE = `${PRODUCT}/create`;
const PRODUCT_EDIT = `${PRODUCT}/edit/:id`;
const PRODUCT_QUESTIONS = `${PRODUCT}/questions`;
const ORDER = `/order`;
const ORDER_CANCLE = `${ORDER}/cancle`;
const ORDER_COMPLETED = `${ORDER}/completed`;
const CUSTOMER = `/customer`;
const CUSTOMER_GROUPS = `${CUSTOMER}/groups`
const SUPPLIER = `/supplier`;


const PATH_URL = {
    LOGIN: LOGIN,
    DASHBOARD: DASHBOARD,
    PRODUCT: PRODUCT,
    PRODUCT_CREATE: PRODUCT_CREATE,
    PRODUCT_EDIT: PRODUCT_EDIT,
    PRODUCT_QUESTIONS: PRODUCT_QUESTIONS,
    ORDER: ORDER,
    ORDER_CANCLE: ORDER_CANCLE,
    ORDER_COMPLETED: ORDER_COMPLETED,
    CUSTOMER: CUSTOMER,
    CUSTOMER_GROUPS: CUSTOMER_GROUPS,
    SUPPLIER: SUPPLIER,

}

export default PATH_URL;