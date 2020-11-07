import axios from 'axios';

import { PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS } from './ActionTypes';

export const makePayment = (user, email, amount) => {
  return async dispatch => {
    try {
      dispatch({
        type: PAYMENT_REQUEST,
      });

      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post(
        '/pay',
        {
          user,
          email,
          amount,
        },
        config
      );

      dispatch({
        type: PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAYMENT_FAIL,
        payload: error,
      });
    }
  };
};

//ubixePKGwvzPXaXq
