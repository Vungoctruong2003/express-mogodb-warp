export default class BaseModel {
    collection;

    constructor(model) {
        this.collection = global.sharedMongoClient.db('my-express').collection(model);
    }

    async findOne(option) {
        return this.collection.findOne({deleted_at: null, ...option});
    }

    async create(data) {
        const result = await this.collection.insertOne(data);
        return result.insertedId;
    }

    async findAndUpdate(filter, updateData, optionReturnNewDocument = true) {
        return await this.collection.findOneAndUpdate(
            {deleted_at: null, ...filter},
            {$set: updateData},
            {
                returnNewDocument: optionReturnNewDocument,
            }
        );
    }

    async countByOption(filter) {
        return await this.collection.countDocuments(
            {deleted_at: null, ...filter},
        );
    }

    async getByOptionWithPaginate(filter = {}, skipRecords, perPage) {
        return await this.collection.find({deleted_at: null, ...filter})
            .skip(skipRecords)
            .limit(perPage)
            .toArray();
    }

    async getAll() {
        return await this.collection.find({deleted_at: null})
            .toArray();
    }
}