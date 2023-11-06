import role from "../models/role.js";

export const getRoleModel = async () => {
    return new role();
}
