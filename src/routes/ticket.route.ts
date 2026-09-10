import { Router } from "express";
import {
  getTicket,
  postTicket,
  UpdateTicket,
} from "../controllers/ticket.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createTicketSchema,
  UpdateTicketSchema,
} from "../schemas/ticket.schema";
const router = Router();

router.get("/", verifyToken, authorize("DIRECTOR", "TECNICO"), getTicket);
router.post(
  "/",
  verifyToken,
  authorize("DIRECTOR", "PROFESOR"),
  validate(createTicketSchema, "body"),
  postTicket,
);
router.put(
  "/:id",
  verifyToken,
  authorize("TECNICO"),
  validate(UpdateTicketSchema, "body"),
  UpdateTicket,
);
export default router;
