import {Router} from "express";
import {
    createRoleController,
    detailRoleController,
    deleteRoleController,
    getRoles, editRoleController
} from "../controllers/role/roleController.js";
import {authenticateJWT} from "../middlewares/authMiddleware.js";
import {createValidate} from "../validators/role/createRole.js";
import {isRoleAdmin} from "../middlewares/isRoleAdmin.js";


const routeRole = Router();

routeRole.get('/', [authenticateJWT], getRoles);
routeRole.post('/', [authenticateJWT, isRoleAdmin], deleteRoleController);
routeRole.get('/detail', [authenticateJWT], detailRoleController);
routeRole.put('/', [authenticateJWT, isRoleAdmin], editRoleController);
routeRole.post('/create', [authenticateJWT, isRoleAdmin, createValidate()], createRoleController);

export default routeRole;