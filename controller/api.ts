import { Request, Response } from "express";
import { userService } from "../services/user";
import { response_handler } from "../utils/response.utils";
import { ClientError, InternalServerError } from "../entities/ApiError";
import { labelService } from "../services/label";
// import { updateUser, fetchUser } from "../repository/userCollection";

export const createUserHandler = async (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const token = await userService.createUser(userData);

    response_handler({
      res,
      status: 200,
      content: token,
      message: "User created",
    });
  } catch (error) {
    if (error instanceof ClientError || error instanceof InternalServerError) {
      return response_handler({
        res,
        status: error.code,
        message: error.message,
        errors: error.errors,
      });
    }

    return response_handler({
      res,
      status: 500,
      message: "internal server error",
      errors: (error as Error).stack,
    });
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  const userId: string = req.userId;
  const userData = req.body;

  userData.id = userId;

  try {
    await userService.updateUser(userData);

    response_handler({
      res,
      status: 200,
      content: userData,
      message: "User data updated successfully",
    });
  } catch (error) {
    if (error instanceof ClientError || error instanceof InternalServerError) {
      return response_handler({
        res,
        status: error.code,
        message: error.message,
        errors: error.errors,
      });
    }

    return response_handler({
      res,
      status: 500,
      message: "internal server error",
      errors: (error as Error).stack,
    });
  }
};

export const fetchUserHandler = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    const userData = await userService.getUserById(userId);

    response_handler({
      res,
      status: 200,
      content: userData,
      message: "User data fetched successfully",
    });
  } catch (error) {
    if (error instanceof ClientError || error instanceof InternalServerError) {
      return response_handler({
        res,
        status: error.code,
        message: error.message,
        errors: error.errors,
      });
    }

    return response_handler({
      res,
      status: 500,
      message: "internal server error",
      errors: (error as Error).stack,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await userService.login(req.body);

    response_handler({
      res,
      status: 200,
      content: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    if (error instanceof ClientError || error instanceof InternalServerError) {
      return response_handler({
        res,
        status: error.code,
        message: error.message,
        errors: error.errors,
      });
    }

    return response_handler({
      res,
      status: 500,
      message: "internal server error",
      errors: (error as Error).stack,
    });
  }
};

export const getLabel = async (req: Request, res: Response) => {
  try {
    const label = await labelService.getLabel();

    response_handler({
      res,
      status: 200,
      content: label,
      message: "Label fetched successfully",
    });
  } catch (error) {
    if (error instanceof ClientError || error instanceof InternalServerError) {
      return response_handler({
        res,
        status: error.code,
        message: error.message,
        errors: error.errors,
      });
    }

    return response_handler({
      res,
      status: 500,
      message: "internal server error",
      errors: (error as Error).stack,
    });
  }
};

export const updateLabel = async (req: Request, res: Response) => {
  try {
    const label = req.body;

    await labelService.updateLabel(label);

    response_handler({
      res,
      status: 200,
      content: label,
      message: "Label updated successfully",
    });
  } catch (error) {
    if (error instanceof ClientError || error instanceof InternalServerError) {
      return response_handler({
        res,
        status: error.code,
        message: error.message,
        errors: error.errors,
      });
    }

    return response_handler({
      res,
      status: 500,
      message: "internal server error",
      errors: (error as Error).stack,
    });
  }
};
