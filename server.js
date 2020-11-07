const express = require('express');
const Payment = require('./models/Payment');
require('./config/mongooseDbConnect')();

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

//Routes
app.post('/pay', async (req, res) => {
  try {
    const { user, email, amount } = req.body;

    const newPayment = await Payment.create({ user, email, amount });
    res.json(newPayment);
  } catch (error) {
    res.json(error);
  }
});

app.listen(5000, () => {
  console.log(`Server is runing on port 5000`);
});
