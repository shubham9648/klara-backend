const { responseHandler } = require('../../middleware/response-handler');
const Error = require('../../middleware/error-handler');
const service = require('../services/notification');
const { ObjectId  } = require("mongodb")


exports.create = async (req, res, next) => {
    try {

        const value = req.body;

        var addedBy = req.user.userId;

        value.addedBy = addedBy;

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
        if(reqQuery.refrenceId) filter.name = ObjectId(reqQuery.refrenceId);
        if(reqQuery.id) filter['_id'] = ObjectId(reqQuery.id);
        if(reqQuery.status) filter['status'] = reqQuery.status;

        const baseQuery = [
            {
                '$match': filter
              },
        ];

        const query = [
            ...baseQuery,
             {
              '$lookup': {
                'from': 'users', 
                'localField': 'refrenceId', 
                'foreignField': '_id', 
                'as': 'employeeDetail'
              }
            }, {
              '$unwind': {
                'path': '$employeeDetail', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$lookup': {
                'from': 'orders', 
                'localField': 'orderId', 
                'foreignField': '_id', 
                'as': 'orderDetails'
              }
            }, {
              '$unwind': {
                'path': '$orderDetails', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'addedBy', 
                'foreignField': '_id', 
                'as': 'userDetails'
              }
            }, {
              '$unwind': {
                'path': '$userDetails', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$skip': 0
            }, {
              '$limit': 1
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
          ]

        const dataQuery = [
            {
                $facet: {
                    data: query,
                    count: baseQuery
                }
            }
        ]  
        
        const response = await service.search(dataQuery);

        responseHandler(response, res);

    } catch (err) {
        console.log("eroror is ", err);
        next(err);
    }
};