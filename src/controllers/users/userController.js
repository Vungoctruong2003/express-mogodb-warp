import {
    deleteUserByIdService,
    detailUserByIdService,
    editUserByIdService,
    getAllUserService, setRoleForUserService
} from "../../services/users/userService.js";
import {buildSuccessResponse} from "../../ultils/successResponse.js";
import {buildErrorResponse} from "../../ultils/errorResponse.js";
import {validationResult} from "express-validator";

export const getAllUserController = async (req, res) => {
    try {
        const data = await getAllUserService(
            req.query.keySearch,
            req.query.roleSearch,
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
        let data = await detailUserByIdService(
            req.query.id
        );
        if (data.length === 0) {
            data = {}
        }
        res.send(buildSuccessResponse(data[0]));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const editUserController = async (req, res) => {
    try {

        const dataEdit = await editUserByIdService(
            req.body.id,
            req.body.dataEditUser,
        );

        if (typeof dataEdit == "string") {
            return res.send(buildErrorResponse({}, dataEdit));
        }

        const data = await detailUserByIdService(
            req.body.id,
        );

        const userEdit = data[0]
        userEdit.role_name = userEdit.role_users.map(role => role.name).join(', ');

        res.send(buildSuccessResponse(userEdit));
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