import { Router } from "express";
import { getHealthCheck } from "../controllers/healthcheck-controller";

const router = Router();

router.route("/").get(getHealthCheck);

export default router;
