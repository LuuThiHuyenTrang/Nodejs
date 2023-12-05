import { Router } from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const routerPro = Router();

routerPro.get("/", getAll);
routerPro.get("/:id", getDetail);
routerPro.post("/", checkPermission, create);
routerPro.patch("/:id", checkPermission, update);
routerPro.delete("/:id", checkPermission, remove);

export default routerPro;
