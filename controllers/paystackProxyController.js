import expressAsyncHandler from "express-async-handler";
import axios from "axios";

//PAYSTACK POST REQUES HANDLER
const paystackPostRequestProxyController = expressAsyncHandler(
  async (req, res) => {
    try {
      let { data } = await axios.post(req.body.paystackUrl, req.body.data, {
        headers: {
          Authorization: `Bearer ${process.env.paystackTestSecretKey}`,
          "Content-Type": "application/json",
        },
      });
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);

//PAYSTACK GET REQUEST HANDLER
const paystackGetRequestProxyController = expressAsyncHandler(
  async (req, res) => {
    try {
      const { data } = await axios.get(req.body.paystackUrl, {
        headers: {
          Authorization: `Bearer ${process.env.paystackTestSecretKey}`,
          "Content-Type": "application/json",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
export {
  paystackPostRequestProxyController,
  paystackGetRequestProxyController,
};
