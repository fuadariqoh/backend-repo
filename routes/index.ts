import { Router } from "express";
import { userRouter } from "./user.route";
import { labelRouter } from "./label.route";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/label", labelRouter);

export { apiRouter };
