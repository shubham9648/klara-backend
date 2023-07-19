const { responseHandler } = require('../../middleware/response-handler');
const Error = require('../../middleware/error-handler');
const service = require('../services/review');
const { ObjectId  } = require("mongodb")


exports.create = async (req, res, next) => {
    try {

        const value = req.body;

        var addedBy = req.user.userId;

        value.addedBy = addedBy;

        await service.updateNotification(value.notificationId);

        const response = await service.create(value);

        responseHandler(response, res);

    } catch (err) {
        console.log("error is ", err);
        next(err);
    }
};

exports.notify = async (body) => {
    return await service.create(body);
}

exports.search = async (req, res, next) => {
    try {

        const reqQuery = req.query;
        const pagination = { skip: 0, limit: 30 };
        if (reqQuery.pageNo && reqQuery.pageSize) {
            pagination.skip = parseInt((reqQuery.pageNo - 1) * reqQuery.pageSize);
            pagination.limit = parseInt(reqQuery.pageSize);
        }
        
        const filter = {}
        if(reqQuery.id) filter['_id'] = ObjectId(reqQuery.id);
        
        const result =  service.find(filter, pagination);
        const document = service.countDocument(filter);

        const [response, count] = await Promise.allSettled([result, document]);

        responseHandler({response: response.value, count: count.value}, res);

    } catch (err) {
        console.log("eroror is ", err);
        next(err);
    }
};

exports.updateOne = async (req, res, next) => {
    try {

        const value = req.body;

        const id = req.params.id;

        const response = await service.updateOne(id, value);

        return responseHandler(response, res);
    } catch (err) {
        console.log("error is ", err);
        next(err);
    }
};