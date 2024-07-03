import { Router } from "express";
import {
  createPackage,
  getPackageById,
  updatePage,
  deletePackage,
  assignPackage,
} from "./Package.controller";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/", createPackage);
router.route("/:id").get(getPackageById).put(updatePage).delete(deletePackage);
router.route("/assign/:id").get(authMiddleware, assignPackage);
export default router;
