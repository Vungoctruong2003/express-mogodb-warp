import {getRoleModel} from "../../helpers/getRoleModel.js";
import {ObjectId} from "mongodb";

export const deleteRoleByIdService = async (id) => {
    const roleModel = await getRoleModel();
    await roleModel.findAndUpdate(
        {_id: new ObjectId(id)},
        {deleted_at: new Date()}
    );
    return 'Xoá thành công'
}

export const detailRoleByIdService = async (id) => {
    const roleModel = await getRoleModel();
    return await roleModel.findOne(
        {_id: new ObjectId(id)},
    );
}

export const createRoleService = async (data) => {
    const roleModel = await getRoleModel();

    const isExits = await roleModel.findOne(data);

    if (isExits !== null) {
        return 'đã tồn tại bản ghi trong hệ thống';
    }
    return await roleModel.create(data);
}

export const editRoleByIdService = async (id, editDataRole) => {
    const roleModel = await getRoleModel();
    const isExits = await roleModel.findOne({_id: {$ne: new ObjectId(id)}, name: editDataRole.name});
    if (isExits !== null) {
        return 'đã tồn tại bản ghi trong hệ thống';
    }
    return await roleModel.findAndUpdate(
        {_id: new ObjectId(id)},
        editDataRole
    );
}

export const getAllRoleService = async () => {
    const roleModel = await getRoleModel();
    return await roleModel.getAll()
}


