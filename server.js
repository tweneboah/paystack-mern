import express from 'express';
import dotenv from 'dotenv';
import { mongooseDbConnect } from './config/mongooseDbConnect';
import { errorMiddlewares, notFound } from './middlewares/errorMiddlewares';
import { paystackProxyRoutes } from './routes/paystackProxyRoutes';
import { userRoutes } from './routes/usersRoutes';
import { productRoute } from './routes/productRoutes';

mongooseDbConnect();
dotenv.config();

const app = express();
//Middlewares
app.use(express.json());

//PAYSTACK PROXY ROUTES
app.use('/', paystackProxyRoutes);

//USERS ROUTES
app.use('/api/users', userRoutes);
app.use('/api/products', productRoute);
//Error handler
app.use(notFound);
app.use(errorMiddlewares);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
