import {Router} from "express";
import {
    deleteUserController,
    detailUserController,
    editUserController,
    getAllUserController, setRoleForUserController
} from "../controllers/users/userController.js";
import {authenticateJWT} from "../middlewares/authMiddleware.js";
import {createValidate} from "../validators/role/setRoleForUser.js";
import {isRoleAdmin} from "../middlewares/isRoleAdmin.js";


const routerUser = Router();

routerUser.get('/', [authenticateJWT], getAllUserController);
routerUser.post('/', [authenticateJWT], deleteUserController);
routerUser.get('/detail', [authenticateJWT], detailUserController);
routerUser.put('/', [authenticateJWT], editUserController);
routerUser.put('/set-role', [authenticateJWT, createValidate(), isRoleAdmin], setRoleForUserController);

export default routerUser;