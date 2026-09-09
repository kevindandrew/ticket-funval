import { Router } from "express";
import { getUsuarios } from "../controllers/usuario.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";
const router = Router();

router.get("/", verifyToken, authorize("DIRECTOR"), getUsuarios);

export default router;
