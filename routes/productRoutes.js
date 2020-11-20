import express from 'express';
import {
  createProductsControllers,
  fetchUProductsController,
} from '../controllers/productsControllers';

const productRoute = express.Router();

productRoute.post('/', createProductsControllers);
productRoute.get('/', fetchUProductsController);
export { productRoute };
