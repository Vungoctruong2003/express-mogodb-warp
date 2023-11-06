import bcrypt from "bcrypt";
import {getUserModel} from "../../helpers/getUserModel.js";

export const registerService = async (email, password, phone, name) => {
    const userModel = await getUserModel();

    const user = await userModel.findOne({email: email});
    if (user) {
        return 'Tài khoản đã tồn tại';
    }

    const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: await bcrypt.hashSync(password, 10)
    }
    await userModel.create(newUser);
    return newUser;
}