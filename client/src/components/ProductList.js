import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductActions } from '../redux/actions/productAction';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const productsList = useSelector(state => state.productsList);

  const { products } = productsList;

  useEffect(() => {
    dispatch(fetchProductActions());
  }, []);

  const sendToPay = price => {
    history.push(`/payment?price=${price}`);
  };
  return (
    <section class='py-5'>
      {products.map(product => (
        <>
          <div>
            <div>
              <p>{product.title}</p>
              <p>GHS {product.price}</p>
              <p>Store: {product.author && product.author.fullName}</p>
              <button onClick={() => sendToPay(product.price)}>Buy Now</button>
            </div>
          </div>
        </>
      ))}
    </section>
  );
};

export default ProductList;
