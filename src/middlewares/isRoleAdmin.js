import {getUserModel} from "../helpers/getUserModel.js";
import {ObjectId} from "mongodb";

export const isRoleAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const userModel = await getUserModel();

    let userCurrent = await userModel.detailUser({email: req.user.email});
    if (userCurrent.length === 0) {
        return res.sendStatus(403);
    }

    userCurrent = userCurrent[0];

    const currentRoles = userCurrent.role_users;

    if (currentRoles.length === 0) {
        return res.sendStatus(403);
    }

    const isAdminPresent = currentRoles.some(role => role.name === 'admin');

    if (!isAdminPresent) {
        return res.sendStatus(403);
    }

    req.user.roles = currentRoles;
    next();
};