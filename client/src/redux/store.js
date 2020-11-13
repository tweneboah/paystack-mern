import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import paymentReducer from './paymentReducer';

const middleware = [thunk];

const initializeState = { amount: '899' };

const reducer = combineReducers({
  payment: paymentReducer,
});

//store

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
