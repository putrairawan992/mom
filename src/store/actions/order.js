import dispatchType from "./dispatchType";
import { apiGetWithToken } from "../../services/api";

export const getGlobalListNeedResponse = path => async dispatch => {
  try {
    const response = await apiGetWithToken(path);
    dispatch(
      dispatchType.needResponse(
        response.data.data.invoices,
        response.data.data.total
      )
    );
  } catch (error) {
    dispatch(dispatchType.needResponse([], 0));
  }
};

export const getGlobalListNeedPurchase = path => async dispatch => {
  try {
    const response = await apiGetWithToken(path);
    dispatch(
      dispatchType.needPurchase(
        response.data.data.invoices,
        response.data.data.total
      )
    );
  } catch (error) {
    dispatch(dispatchType.needPurchase([], 0));
  }
};

export const getGlobalListPurchased = path => async dispatch => {
  try {
    const response = await apiGetWithToken(path);
    dispatch(
      dispatchType.purchased(
        response.data.data.invoices,
        response.data.data.total
      )
    );
  } catch (error) {
    dispatch(dispatchType.purchased([], 0));
  }
};

export const getGlobalListReadyToShip = path => async dispatch => {
  try {
    const response = await apiGetWithToken(path);
    dispatch(
      dispatchType.readyToShip(
        response.data.data.invoices,
        response.data.data.total
      )
    );
  } catch (error) {
    dispatch(dispatchType.readyToShip([], 0));
  }
};

export const getGlobalListShipped = path => async dispatch => {
  try {
    const response = await apiGetWithToken(path);
    dispatch(
      dispatchType.shipped(
        response.data.data.invoices,
        response.data.data.total
      )
    );
  } catch (error) {
    dispatch(dispatchType.shipped([], 0));
  }
};
