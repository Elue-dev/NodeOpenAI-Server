import { Router } from "express";
import generateImage from "../controller/openapi_controller";

const router = Router();

router.post("/generate-image", generateImage);

export default router;
