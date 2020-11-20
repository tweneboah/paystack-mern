import expressAsyncHandler from 'express-async-handler';
import { Product } from '../models/ProductModel';

const createProductsControllers = expressAsyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(200).json({
      _id: newProduct._id,
      title: newProduct.title,
      description: newProduct.description,
      author: newProduct.author,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const fetchUProductsController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await Product.find().populate('author').exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(200);
  }
});

export { createProductsControllers, fetchUProductsController };
