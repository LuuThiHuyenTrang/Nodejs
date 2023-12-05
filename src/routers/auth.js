// import { Router } from "express";
// import { signUp } from "../controllers/auth";

import { Router } from "express";
import { signIn, signUp, updateUser } from "../controllers/auth";

const routerAuth = Router();

routerAuth.post("/signup", signUp);
routerAuth.post("/signin", signIn);
routerAuth.put("/update", updateUser);

export default routerAuth;
