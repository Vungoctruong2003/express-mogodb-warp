import user from "../models/user.js";

export const getUserModel = async () => {
    return new user();
}
