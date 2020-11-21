import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import paymentReducer from './reducers/paymentReducer';
import { productsReducer } from './reducers/productsReducer';

const middleware = [thunk];

const reducer = combineReducers({
  payment: paymentReducer,
  productsList: productsReducer,
});

//store
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
