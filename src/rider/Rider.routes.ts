import { Router } from "express";
import {
  createRider,
  getRiderById,
  updateRider,
  deleteRider,
} from "./Rider.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/", createRider);
router
  .route("/:id")
  .get(getRiderById)
  .put(upload.single("avatar"), updateRider)
  .delete(deleteRider);

export default router;
