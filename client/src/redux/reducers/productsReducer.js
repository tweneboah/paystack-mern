import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
} from '../ActionTypes';

const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case PRODUCT_FETCH_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case PRODUCT_FETCH_FAIL:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export { productsReducer };
