const mongoose = require('mongoose');

const mongooseDbConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ben:ubixePKGwvzPXaXq@cluster0.jx9n4.mongodb.net/paystack?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('DB Connected  Successfully');
  } catch (error) {
    console.log('Error occured', error);
  }
};

module.exports = mongooseDbConnect;
