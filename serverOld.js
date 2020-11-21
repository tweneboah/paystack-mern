import express from 'express';
import dotenv from 'dotenv';
import User from './models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Axios from 'axios';
import cors from 'cors';
import { mongooseDbConnect } from './config/mongooseDbConnect';
mongooseDbConnect();
dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/', async (req, res) => res.send('PAYSTACK'));

//Create User
const createUser = async () => {
  let searchUser = await User.findOne({ email: 'eyiwumiolaboye@gmail.com' });
  // console.log(searchUser);
  if (!searchUser) {
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync('Password', salt);
    let firstUser = await User.create({
      firstName: 'Ola',
      lastName: 'Bohye',
      email: 'eyiwumiolaboye@gmail.com',
      password,
    });
    console.log('user created with email ' + firstUser.email);
  } else {
    console.log('User already exist!');
  }
};

//NOTE:
//The logic is that this route can handle any kind of route we may need in paystack
//So to make it dynamic we will pass the route from the request body and the data it needs as well
//We need to handle two routes thus post and get to paystack but for our own server we will handle all of them as post because we will make request to our and our server will talk to paystack either to post or to get

//proxy routes

app.post('/paystack/get', async (req, res) => {
  try {
    let response = await Axios.get(req.body.route, {
      headers: {
        Authorization: `Bearer ${process.env.paystackTestSecretKey}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(201).json({ response: response.data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

//Webhook
app.post('/paystack/webhook', async (req, res) => {
  try {
    // console.log(req.body);
    let secret = process.env.paystackTestSecretKey;
    let hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
      let webHookData = req.body;
      console.log(webHookData);
      let paidUser = await User.findOne({
        email: webHookData.data.customer.email,
      });
      let updatedPaidUser = await User.findByIdAndUpdate(
        paidUser._id,
        {
          paidForVacation: true,
          paymentDetails: webHookData,
        },
        { new: true }
      );
      console.log(updatedPaidUser);
    }
    res.send(200);
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }
});

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
