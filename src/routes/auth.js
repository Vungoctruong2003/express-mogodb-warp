import {Router} from "express";
import {loginController} from "../controllers/au/loginController.js";
import {registerController} from "../controllers/au/registerController.js";
import {registerValidate} from "../validators/au/registerValidate.js";
import {refreshTokenController} from "../controllers/au/refreshTokenController.js";
import {authenticateJWT} from "../middlewares/authMiddleware.js";
import {getMeController} from "../controllers/au/getMeController.js";


const routerAuth = Router();

routerAuth.post('/login', loginController);
routerAuth.post('/register', registerValidate(), registerController);
routerAuth.get('/refresh-token', [authenticateJWT], refreshTokenController);
routerAuth.get('/get-me', [authenticateJWT], getMeController);

export default routerAuth;