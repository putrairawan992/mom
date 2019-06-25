import TYPE from "../actions/type";

const initialState = {
  invoiceNeedResponse: [],
  totalNeedResponse: 0,
  invoiceNeedPurchase: [],
  totalNeedPurchase: 0,
  invoicePurchased: [],
  totalPurchased: 0,
  invoiceReadyToShip: [],
  totalReadyToShip: 0,
  invoiceShipped: [],
  totalShipped: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.NEED_RESPONSE:
      return {
        ...state,
        invoiceNeedResponse: action.invoice,
        totalNeedResponse: action.total
      };
    case TYPE.NEED_PURCHASE:
      return {
        ...state,
        invoiceNeedPurchase: action.invoice,
        totalNeedPurchase: action.total
      };
      case TYPE.PURCHASED:
      return {
        ...state,
        invoicePurchased: action.invoice,
        totalPurchased: action.total
      };
      case TYPE.READY_TO_SHIP:
      return {
        ...state,
        invoiceReadyToShip: action.invoice,
        totalReadyToShip: action.total
      };
      case TYPE.SHIPPED:
      return {
        ...state,
        invoiceShipped: action.invoice,
        totalShipped: action.total
      };
    default:
      return state;
  }
};
