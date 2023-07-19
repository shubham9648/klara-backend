const model = require("../models/review");
const dal = require("../helpers/dal")
const notificationModel = require("../models/notification");
const { ObjectId } = require("mongodb")

exports.create = async (body) => {
    return await dal.create(model, body);
};

exports.updateNotification = async (id) => {
    return await dal.findOneAndUpdate(notificationModel, {_id: new ObjectId(id)}, { $set: {status: "completed"}});
}

exports.find = async (filter, pagination) => {
    return await dal.find(model, filter, pagination, {createdAt: -1}, {});
};

exports.countDocument = async (filter) => {
    return await dal.countDocuments(model, filter);
};

exports.updateOne = async (id, body) => {
    return await dal.findOneAndUpdate(model, {_id: id}, {$set: body})
}