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
    return await userModel.detailUser(
        {_id: new ObjectId(id)},
    );
}

export const detailUserByEmailService = async (email) => {
    const userModel = await getUserModel();
    let user = await userModel.detailUser(
        {email: email},
    );
    return user[0];
}

export const editUserByIdService = async (id, editDataUser) => {
    const userModel = await getUserModel();
    const user = await userModel.findOne({email: editDataUser.email, _id: {$ne: new ObjectId(id)}});

    if (user !== null) {
        return 'Tài khoản đã tồn tại';
    }

    return await userModel.findAndUpdate(
        {_id: new ObjectId(id)},
        editDataUser
    );
}

export const getAllUserService = async (keySearch, roleSearch, perPage, page) => {
    const optionKeySearch = keySearch === '' ? {} : {
        $or: [
            {name: {$regex: keySearch, $options: "i"}},
            {email: {$regex: keySearch, $options: "i"}}
        ]
    };

    const optionRole = roleSearch === '' ? {} : {"roles._id": new ObjectId(roleSearch)};

    const option = {...optionKeySearch, ...optionRole}
    const userModel = await getUserModel();
    const totalRecord = await userModel.countByOption(option);

    const skipRecord = (page - 1) * perPage;
    let users = await userModel.allUsers(option, skipRecord, +perPage)

    users = users = users.map(user => {

        user.role_name = 'chưa có quyền gì';

        if (user.roles) {
            const roleNames = user.role_users.map(role => role.name);
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
    let rolesToSet = roles.map(item => ({
        _id: new ObjectId(item),
    }));

    const userModel = await getUserModel();

    await userModel.findAndUpdate(
        {_id: new ObjectId(userId)},
        {roles: rolesToSet}
    )

    let userSetRole = await userModel.detailUser(
        {_id: new ObjectId(userId)},
    )
    userSetRole = userSetRole[0];

    userSetRole.role_name = userSetRole.role_users.map(role => role.name).join(', ');
    return userSetRole
}
