import BaseModel from "./BaseModel.js";

export default class user extends BaseModel {

    constructor() {
        super(
            'users'
        );
    }

    async detailUser(option) {
        return this.collection.aggregate([
            {
                $match: {
                    deleted_at: null, ...option
                }
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roles._id",
                    foreignField: "_id",
                    as: "role_users"
                }
            }
        ]).toArray();
    }

    async allUsers(filter = {}, skipRecords, perPage) {
        return this.collection.aggregate([
            {
                $match: {
                    deleted_at: null,
                    ...filter
                }
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roles._id",
                    foreignField: "_id",
                    as: "role_users"
                }
            },
            {
                $skip: skipRecords
            },
            {
                $limit: perPage
            },
        ]).toArray();
    }
}