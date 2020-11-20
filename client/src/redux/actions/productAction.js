import axios from 'axios';
import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
} from '../ActionTypes';

export const fetchProductActions = () => {
  return async dispatch => {
    try {
      dispatch({
        type: PRODUCT_FETCH_REQUEST,
      });
      const { data } = await axios.get('/api/products');
      dispatch({
        type: PRODUCT_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_FETCH_FAIL,
        payload: error,
      });
    }
  };
};
