import {
    deleteUserByIdService,
    detailUserByIdService,
    editUserByIdService,
    getAllUserService, getRoleOfUserByIdService, setRoleForUserService
} from "../../services/users/userService.js";
import {buildSuccessResponse} from "../../ultils/successResponse.js";
import {buildErrorResponse} from "../../ultils/errorResponse.js";
import {validationResult} from "express-validator";

export const getAllUserController = async (req, res) => {
    try {
        const data = await getAllUserService(
            req.query.keySearch,
            req.query.perpage ?? process.env.DEFAULT_PERPAGE,
            req.query.page ?? process.env.DEFAULT_CURRENT_PAGE
        );
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const data = await deleteUserByIdService(
            req.body.id
        );
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const detailUserController = async (req, res) => {
    try {
        const data = await detailUserByIdService(
            req.query.id
        );
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const editUserController = async (req, res) => {
    try {

        await editUserByIdService(
            req.body.id,
            req.body.dataEditUser,
        );

        const data = await detailUserByIdService(
            req.body.id,
        );

        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}
export const getRole = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response = buildErrorResponse({}, errors.array());
            return res.status(400).send(response);
        }

        const data = await getRoleOfUserByIdService(
            req.body.id,
        );

        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}
export const setRoleForUserController = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response = buildErrorResponse({}, errors.array());
            return res.status(400).send(response);
        }

        res.send(
            await setRoleForUserService(
                req.body.user_id,
                req.body.roles,
            )
        );
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}