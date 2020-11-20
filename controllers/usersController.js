import expressAsyncHandler from 'express-async-handler';
import { User } from '../models/UserModel';

const createUserController = expressAsyncHandler(async (req, res) => {
  //check if user exist
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    throw new Error(`${req.body.email}  already exist`);
  }
  try {
    const newUserCreated = await User.create(req.body);
    res.status(200).json({
      _id: newUserCreated._id,
      fullName: newUserCreated.fullName,
      email: newUserCreated.email,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const fetchUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().populate('products');
    res.status(200).json(users);
  } catch (error) {
    res.status(200);
  }
});

export { createUserController, fetchUsersController };
