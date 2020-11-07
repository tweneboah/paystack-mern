const mongoose = require('mongoose');

const Paymentchema = new mongoose.Schema({
  user: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
});

const Payment = mongoose.model('Payment', Paymentchema);

module.exports = Payment;
