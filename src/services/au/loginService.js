import bcrypt from 'bcrypt';
import generateToken from "../../helpers/generateToken.js";
import {getUserModel} from "../../helpers/getUserModel.js";

export const loginService = async (email, password) => {
    const userModel = await getUserModel();
    const user = await userModel.findOne({email: email});

    if (user === null) {
        return "Tài khoản không tồn tại trong hệ thống";
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return "Mật khẩu không đúng"
    }

    const payloadToken = {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email
    };

    return {
        access_token: generateToken(payloadToken),
        refresh_token: generateToken(payloadToken, '2d'),
        user: payloadToken
    };
}