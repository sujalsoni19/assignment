import { Router } from "express";
import {
  createTask,
  getMyTasks,
  toggleTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); 

router.post("/", createTask);
router.get("/", getMyTasks);
router.patch("/:id/toggle", toggleTask);
router.delete("/:id", deleteTask);

export default router;
