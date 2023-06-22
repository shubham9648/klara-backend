const { responseHandler } = require('../../middleware/response-handler');
const Error = require('../../middleware/error-handler');
const service = require('../services/contactUs.js');



exports.create = async (req, res, next) => {
    try {

        const value = req.value;

        const addedBy = req.user.userId;

        value.addedBy = addedBy;

        const response = await service.create(value);

        responseHandler(response, res);

    } catch (err) {
        console.log("error is ", err);
        next(err);
    }
};

exports.search = async (req, res, next) => {
    try {

        const reqQuery = req.query;
        const pagination = { skip: 0, limit: 30 };
        if (reqQuery.pageNo && reqQuery.pageSize) {
            pagination.skip = parseInt((reqQuery.pageNo - 1) * reqQuery.pageSize);
            pagination.limit = parseInt(reqQuery.pageSize);
        }
        
        const filter = {}
        if(reqQuery.name) filter.name = { $regex : reqQuery.name || "", $options : "i" };
        if(reqQuery.id) filter['_id'] = ObjectId(reqQuery.id);
        
        const result =  service.find(filter, pagination);
        const document = service.countDocument(filter);

        const [response, count] = await Promise.allSettled([result, document]);

        responseHandler({response: response.value, count: count.value});

    } catch (err) {
        console.log("eroror is ", err);
        next(err);
    }
}