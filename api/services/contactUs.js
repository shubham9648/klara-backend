const model = require("../models/contactUs");
const dal = require("../helpers/dal")

exports.create = async (body) => {
    return await dal.create(model, body);
};

exports.find = async (filter, pagination) => {
    return await dal.find(model, filter, pagination, {createdAt: -1}, {});
};

exports.countDocument = async (filter) => {
    return await dal.countDocuments(model, filter);
}