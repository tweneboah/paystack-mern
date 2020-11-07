import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MakePayment from './components/MakePayment';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' component={MakePayment} />
        <Route exact path='/payment/:id' component={PaymentSuccess} />
      </BrowserRouter>
    </div>
  );
}

export default App;
