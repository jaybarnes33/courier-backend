import { Router } from "express";
import {
  createRider,
  getRiderById,
  updateRider,
  deleteRider,
  getDrivers,
} from "./Driver.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/", createRider);
router.get("/", getDrivers);
router
  .route("/:id")
  .get(getRiderById)
  .put(upload.single("avatar"), updateRider)
  .delete(deleteRider);

export default router;
