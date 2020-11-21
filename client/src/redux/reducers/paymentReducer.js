import { PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS } from '../ActionTypes';

const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    // Register
    case PAYMENT_REQUEST:
      return { loading: true };
    case PAYMENT_SUCCESS:
      return {
        loading: false,
        paymentInfo: action.payload,
      };
    case PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
