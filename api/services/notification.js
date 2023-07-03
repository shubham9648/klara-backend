const model = require("../models/notification");
const dal = require("../helpers/dal")

exports.create = async (body) => {
    return await dal.create(model, body);
};

exports.find = async (filter, pagination) => {
    return await dal.find(model, filter, pagination, {createdAt: -1}, {});
};

exports.countDocument = async (filter) => {
    return await dal.countDocuments(model, filter);
};

exports.search = async (query) => {
    const data = await dal.aggregate(model, query);

    return {
        data: data[0].data,
        count: data[0].count ? data[0].count[0].count : 0 
    }
}