import { Router } from "express";
import {
  getTicket,
  postTicket,
  UpdateTicket,
} from "../controllers/ticket.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
const router = Router();

router.get("/", verifyToken, authorize("DIRECTOR", "TECNICO"), getTicket);
router.post("/", verifyToken, authorize("DIRECTOR", "PROFESOR"), postTicket);
router.put("/:id", verifyToken, authorize("TECNICO"), UpdateTicket);
export default router;
