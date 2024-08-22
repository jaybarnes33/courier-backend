import { Router } from "express";
import {
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "./Request.controller";

const router = Router();

router.post("/", createRequest);
router
  .route("/:id")
  .get(getRequestById)
  .put(updateRequest)
  .delete(deleteRequest);

export default router;
