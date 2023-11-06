import {
    createRoleService,
    deleteRoleByIdService,
    detailRoleByIdService,
    editRoleByIdService,
    getAllRoleService
} from "../../services/roles/roleService.js";
import {buildSuccessResponse} from "../../ultils/successResponse.js";
import {buildErrorResponse} from "../../ultils/errorResponse.js";
import {validationResult} from "express-validator";

export const getRoles = async (req, res) => {
    try {
        const data = await getAllRoleService();
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const deleteRoleController = async (req, res) => {
    try {
        const data = await deleteRoleByIdService(
            req.body.id
        );
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const detailRoleController = async (req, res) => {
    try {
        const data = await detailRoleByIdService(
            req.query.id
        );
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const editRoleController = async (req, res) => {
    try {

        const responseEdit = await editRoleByIdService(
            req.body.id,
            req.body.dataEditRole,
        );

        if (typeof responseEdit === 'string') {
            return res.send(
                buildErrorResponse({}, responseEdit)
            )
        }

        const data = await detailRoleByIdService(
            req.body.id,
        );

        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}

export const createRoleController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response = buildErrorResponse({}, errors.array());
            return res.status(400).send(response);
        }

        const insertedId = await createRoleService(
            req.body,
        );

        if (typeof insertedId === 'string') {
            return res.send(
                buildErrorResponse({}, insertedId)
            )
        }

        res.send(
            buildSuccessResponse(
                {'id': insertedId, 'name': req.body.name}
            )
        );
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}