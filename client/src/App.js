import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MakePayment from './components/MakePayment';
import PaymentSuccess from './components/PaymentSuccess';
import ProductList from './components/ProductList';
import Subscribe from './components/Subscribe';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/payment/' component={MakePayment} />
        <Route exact path='/subscribe' component={Subscribe} />
      </BrowserRouter>
    </div>
  );
}

export default App;
