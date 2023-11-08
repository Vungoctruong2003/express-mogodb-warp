import {buildSuccessResponse} from "../../ultils/successResponse.js";
import {buildErrorResponse} from "../../ultils/errorResponse.js";
import {detailUserByEmailService} from "../../services/users/userService.js";

export const getMeController = async (req, res) => {
    try {
        const data = await detailUserByEmailService(req.user.email);
        res.send(buildSuccessResponse(data));
    } catch (e) {
        console.log(e);
        return buildErrorResponse();
    }
}