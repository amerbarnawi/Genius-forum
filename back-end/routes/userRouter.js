import express from "express";

import isUserAuthenticated from "../support/middleware/authentication.js";
import { isUserFound } from "../support/middleware/checkUser.js";
import {
  createUser,
  deleteAccount,
  updateUserData,
  login,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/login", isUserAuthenticated, login);

userRouter.post("/create", isUserFound, createUser);

userRouter.put("/update/:id", isUserAuthenticated, updateUserData);

userRouter.delete("/delete/:id", isUserAuthenticated, deleteAccount);

export default userRouter;
