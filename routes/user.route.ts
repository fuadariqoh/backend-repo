import { Router } from "express";
import {
  updateUserHandler,
  fetchUserHandler,
  createUserHandler,
  login,
} from "../controller/api";
import { authMiddleware } from "../middleware/auth/auth.middleware";
// import { AuthMiddleware } from "../middleware/auth/auth.middleware";

const userRouter = Router();

// endpoint to create user
userRouter.post("/", createUserHandler);

// Endpoint to update user data
userRouter.put("/", authMiddleware.verifyTokenMiddleware(), updateUserHandler);

// Endpoint to fetch user data
userRouter.get(
  "/data",
  authMiddleware.verifyTokenMiddleware(),
  fetchUserHandler
);

userRouter.post("/login", login);

export { userRouter };
