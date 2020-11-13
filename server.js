const express = require('express');
const dotenv = require('dotenv');
const Payment = require('./models/Payment');
const Axios = require('axios');
dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => res.send('PAYSTACK'));

//NOTE:
//The logic is that this route can handle any kind of route we may need in paystack
//So to make it dynamic we will pass the route from the request body and the data it needs as well
//We need to handle two routes thus post and get to paystack but for our own server we will handle all of them as post because we will make request to our and our server will talk to paystack either to post or to get

//proxy routes
app.post('/paystack', async (req, res) => {
  try {
    let response = await Axios.post(req.body.route, req.body.data, {
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

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
