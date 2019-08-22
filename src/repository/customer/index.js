import { apiGetWithToken } from "../../services/api";
import { PATH_CUSTOMER } from "../../services/path/customer";

async function getAll(props) {
  const loading = props.loading ? props.loading : function() {};
  const param = props.param;

  let response = "";
  loading(true);
  try {
    response = await apiGetWithToken(PATH_CUSTOMER.LIST, param);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

const customer = {
  getAll: getAll
};

export default customer;
