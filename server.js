import express from "express";
import dotenv from "dotenv";
import { mongooseDbConnect } from "./config/mongooseDbConnect";
import { errorMiddlewares, notFound } from "./middlewares/errorMiddlewares";
import { paystackProxyRoutes } from "./routes/paystackProxyRoutes";
import { userRoutes } from "./routes/usersRoutes";
import { productRoute } from "./routes/productRoutes";
import cors from "cors";

mongooseDbConnect();
dotenv.config();

const app = express();
//Middlewares
app.use(express.json());

app.use(cors());
app.options(cors());

//PAYSTACK PROXY ROUTES
app.use("/", paystackProxyRoutes);

//proxy routes
app.post("/paystack", async (req, res) => {
  try {
    let response = await Axios.post(req.body.route, req.body.data, {
      headers: {
        Authorization: `Bearer ${process.env.paystackTestSecretKey}`,
        "Content-Type": "application/json",
      },
    });
    res.status(201).json({ response: response.data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

app.post("/paystack/get", async (req, res) => {
  try {
    let response = await Axios.get(req.body.route, {
      headers: {
        Authorization: `Bearer ${process.env.paystackTestSecretKey}`,
        "Content-Type": "application/json",
      },
    });
    res.status(201).json({ response: response.data });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

//Webhook
app.post("/paystack/webhook", async (req, res) => {
  try {
    // console.log(req.body);
    let secret = process.env.paystackTestSecretKey;
    let hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
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
          paymentHistory: [...paidUser.paymentHistory, webHookData],
        },
        { new: true }
      );
      console.log(updatedPaidUser);

      if (webHookData.event === "subscription.create") {
        let userEmail = webHookData.data.customer.email;
        let updatedUser = await User.findOneAndUpdate(
          { email: userEmail },
          { isSubscribed: true },
          { new: true }
        );
        console.log(updatedUser);
      }
    }
    res.send(200);
  } catch (err) {
    console.log(err.message);
    console.log(err);
  }
});
//USERS ROUTES
app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
//Error handler
app.use(notFound);
app.use(errorMiddlewares);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
