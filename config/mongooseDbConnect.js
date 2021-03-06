const mongoose = require("mongoose");

const mongooseDbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test-payment", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB Connected  Successfully");
  } catch (error) {
    console.log("Error occured", error);
  }
};

export { mongooseDbConnect };
