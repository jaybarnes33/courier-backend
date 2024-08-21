import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
} from "./User.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router
  .route("/:id")
  .get(getUserById)
  .put(upload.single("avatar"), updateUser)
  .delete(deleteUser);

export default router;
