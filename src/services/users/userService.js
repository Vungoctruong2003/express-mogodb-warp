import {getUserModel} from "../../helpers/getUserModel.js";
import {ObjectId} from "mongodb";

export const deleteUserByIdService = async (id) => {
    const userModel = await getUserModel();
    await userModel.findAndUpdate(
        {_id: new ObjectId(id)},
        {deleted_at: new Date()}
    );
    return 'Xoá thành công'
}

export const detailUserByIdService = async (id) => {
    const userModel = await getUserModel();
    return await userModel.findOne(
        {_id: new ObjectId(id)},
    );
}

export const editUserByIdService = async (id, editDataUser) => {
    const userModel = await getUserModel();
    return await userModel.findAndUpdate(
        {_id: new ObjectId(id)},
        editDataUser
    );
}

export const getRoleOfUserByIdService = async (id) => {
    const userModel = await getUserModel();
    return await userModel.getRoleOfUserById(
        {'user_roles._id': new ObjectId(id)},
    );
}

export const getAllUserService = async (keySearch, perPage, page) => {
    const option = keySearch === '' ? {} : {
        $or: [
            {name: {$regex: keySearch, $options: "i"}},
            {email: {$regex: keySearch, $options: "i"}}
        ]
    };
    const userModel = await getUserModel();
    const totalRecord = await userModel.countByOption(option);

    const skipRecord = (page - 1) * perPage;
    let users = await userModel.getByOptionWithPaginate(option, skipRecord, +perPage)

    users = users = users.map(user => {

        user.role_name = 'chưa có quyền gì';

        if (user.roles) {
            const roleNames = user.roles.map(role => role.name);
            user.role_name = roleNames.join(', ');
        }

        return user;
    });

    return {
        totalPage: Math.ceil(totalRecord / perPage),
        currentPage: +page,
        perPage: +perPage,
        users: users
    }
}


export const setRoleForUserService = async (userId, roles) => {

    const userModel = await getUserModel();

    await userModel.findAndUpdate(
        {_id: new ObjectId(userId)},
        {roles: roles}
    )

    let userSetRole = await userModel.findOne(
        {_id: new ObjectId(userId)},
    )

    userSetRole.role_name = userSetRole.roles.map(role => role.name).join(', ');
    return userSetRole
}
