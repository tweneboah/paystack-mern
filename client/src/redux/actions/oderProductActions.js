import axios from 'axios';
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from '../ActionTypes';

export const oderProductActions = () => {
  return async dispatch => {
    try {
      dispatch({
        type: ORDER_REQUEST,
      });
      const { data } = await axios.get('/api/products');
      dispatch({
        type: ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_FAIL,
        payload: error,
      });
    }
  };
};
