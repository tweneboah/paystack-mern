import expressAsyncHandler from "express-async-handler";
import { User } from "../models/UserModel";
import Axios from "axios";

const createUserController = expressAsyncHandler(async (req, res) => {
  //check if user exist
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    throw new Error(`${req.body.email}  already exist`);
  }
  try {
    // { business_name: "Cheese Sticks", bank_code: "058", account_number: "0123456789", percentage_charge: 0.2 }
    let {
      business_name,
      bank_code,
      account_number,
      email,
      fullName,
      password,
    } = req.body;
    let response = await Axios.post(
      "https://api.paystack.co/subaccount",
      {
        business_name,
        bank_code,
        account_number,
        percentage_charge: 0.95,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.paystackTestSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data);
    const newUserCreated = await User.create({
      email,
      fullName,
      password,
      subAccount: response.data.data,
    });
    res.status(200).json({
      _id: newUserCreated._id,
      fullName: newUserCreated.fullName,
      subAccount: newUserCreated.subAccount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

const fetchUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().populate("products");
    res.status(200).json(users);
  } catch (error) {
    res.status(200);
  }
});

export { createUserController, fetchUsersController };
