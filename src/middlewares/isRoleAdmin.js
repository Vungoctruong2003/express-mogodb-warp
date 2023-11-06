import jwt from "jsonwebtoken";
import {getUserModel} from "../helpers/getUserModel.js";
import {ObjectId} from "mongodb";

export const isRoleAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const userModel = await getUserModel();

    const userCurrent = await userModel.findOne({_id: new ObjectId(req.user.id)});

    const userRolesCurrent = userCurrent.roles;

    if (!userRolesCurrent) {
        return res.sendStatus(403);
    }

    const isAdminPresent = userRolesCurrent.some(role => role.name === 'admin');

    if (!isAdminPresent) {
        return res.sendStatus(403);
    }

    req.user.roles = userRolesCurrent;
    next();
};