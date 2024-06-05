import type { Request, Response, NextFunction } from "express";
import { ClientError, InternalServerError } from "../../entities/ApiError";
import { response_handler } from "../../utils/response.utils";
import { jwtUtils } from "../../utils/jwt.utils";

class AuthMiddleware {
  verifyTokenMiddleware() {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      try {
        const { authorization } = req.headers;

        if (!authorization)
          throw new ClientError({
            code: 404,
            message: "no token provided!",
          });

        const tokenValue = authorization.split(" ")[1];

        const token: any = jwtUtils.verify(tokenValue);

        req.token = token;
        req.userId = token.id;

        next();
      } catch (error) {
        if (
          error instanceof ClientError ||
          error instanceof InternalServerError
        ) {
          return response_handler({
            res,
            status: error.code,
            message: error.message,
            errors: error.errors,
          });
        }

        return response_handler({
          res,
          status: 400,
          message: "Token not valid",
          errors: (error as Error).stack,
        });
      }
    };
  }
}

const authMiddleware = new AuthMiddleware();

export { authMiddleware };
