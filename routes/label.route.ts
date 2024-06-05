import { Router } from "express";
import { updateLabel, getLabel } from "../controller/api";
// import { authMiddleware } from "../middleware/auth/auth.middleware";
// import { AuthMiddleware } from "../middleware/auth/auth.middleware";

const labelRouter = Router();

// endpoint to create user
labelRouter.put("/", updateLabel);
labelRouter.get("/", getLabel);

export { labelRouter };
