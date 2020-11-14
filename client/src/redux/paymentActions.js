import axios from 'axios';

import { PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS } from './ActionTypes';

export const makePayment = (route, details) => {
  //For redirect
  const openInNewTab = url => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  return async dispatch => {
    try {
      dispatch({
        type: PAYMENT_REQUEST,
      });
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post(
        '/paystack',
        { route, data: details },
        config
      );

      dispatch({
        type: PAYMENT_SUCCESS,
        payload: data,
      });
      //Automatic redirect
      openInNewTab(data.response.data.authorization_url);
    } catch (error) {
      dispatch({
        type: PAYMENT_FAIL,
        payload: error,
      });
    }
  };
};
