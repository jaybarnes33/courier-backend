import { Router } from "express";
import { auth, verify, refreshToken, getAuth } from "./Auth.controller";
import authMiddleware from "../middleware/auth";

const router = Router();
router.get("/", authMiddleware, getAuth);
router.post("/", auth);
router.post("/refresh", refreshToken);
router.post("/otp/:id", verify);
export default router;
