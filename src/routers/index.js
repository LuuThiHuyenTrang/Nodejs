import { Router } from "express";
import routerAuth from "./auth";
import routerPro from "./product";
const router = Router();

router.use("/products", routerPro);
router.use("/auth", routerAuth);

export default router;
