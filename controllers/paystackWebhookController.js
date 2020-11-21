import expressAsyncHandler from "express-async-handler";
import crypto from "crypto";

//Paystack will this automatically
const paystackWebhookController = expressAsyncHandler(async (req, res) => {
  try {
    let secret = process.env.paystackTestSecretKey;
    let hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash == req.headers["x-paystack-signature"]) {
      //We have access to the event data at req.body
      //Here we can check for an event type then triger the neccesaary cutom function
      let webHookData = req.body;
      console.log(webHookData);
      //Find the user and then you can update his records like this
      // let paidUser = await User.findOne({
      //   email: webHookData.data.customer.email,
      // });
      // let updatedPaidUser = await User.findByIdAndUpdate(
      //   paidUser._id,
      //   {
      //     paidForVacation: true,
      //     paymentDetails: webHookData,
      //   },
      //   { new: true }
      // );
      // console.log(updatedPaidUser);
    }
    //Paystack requires us to send 200
    res.send(200);
  } catch (error) {
    console.log(err.message);
    console.log(err);
  }
});

export { paystackWebhookController };
