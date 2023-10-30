import {buildErrorResponse} from "../../ultils/errorResponse.js";
import {buildSuccessResponse} from "../../ultils/successResponse.js";
import {refreshTokenService} from "../../services/au/refreshTokenService.js";
import {validationResult} from "express-validator";

export const refreshTokenController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const response = buildErrorResponse({}, errors.array());
            return res.status(400).send(response);
        }

        const refreshToken = req.headers.authorization.replace("Bearer ", "");

        const data = await refreshTokenService(refreshToken);
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}