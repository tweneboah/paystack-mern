import express from 'express';
import {
  createUserController,
  fetchUsersController,
} from '../controllers/usersController';

const userRoutes = express.Router();

userRoutes.post('/', createUserController);
userRoutes.get('/', fetchUsersController);

export { userRoutes };
