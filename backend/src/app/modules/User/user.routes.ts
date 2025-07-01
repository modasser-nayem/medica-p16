import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { userController } from "./user.controller";

const router = Router();

// Get all users
router.get("/", asyncHandler(userController.getAllUsers));

export const userRoutes = router;
