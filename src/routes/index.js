import {Router} from "express";
import routerAuth from "./auth.js";
import routerUsers from "./user.js";
import routerRoles from "./role.js";


const router = Router();
router.use('/auth', routerAuth)
router.use('/users', routerUsers)
router.use('/roles', routerRoles)

export default router;