import {buildSuccessResponse} from "../../ultils/successResponse.js";
import {buildErrorResponse} from "../../ultils/errorResponse.js";
import {detailUserByIdService} from "../../services/users/userService.js";

export const getMeController = async (req, res) => {
    try {
        const data = await detailUserByIdService(req.user.id);
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}