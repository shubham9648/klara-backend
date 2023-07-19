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
        if(reqQuery.refrenceId) filter.name = new ObjectId(reqQuery.refrenceId);
        if(reqQuery.id) filter['_id'] = new ObjectId(reqQuery.id);
        if(reqQuery.status) filter['status'] = reqQuery.status;

        const baseQuery = [
            {
                '$match': {...filter, active: true}
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
                pipeline: [
                    {
                      $lookup: {
                        from: "masterservices",
                        localField: "service",
                        foreignField: "_id", 
                        as: "service"
                      }
                    }],
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
              '$skip': pagination.skip
            }, {
              '$limit': pagination.limit
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
          ]
          console.log("baseQuery is ----> ",JSON.stringify(baseQuery));
        const countQuery = [
            ...baseQuery,
            {
                $count: 'count'
            }
        ]
        const dataQuery = [
            {
                $facet: {
                    data: query,
                    count: countQuery
                }
            }
        ]  
        console.log("dataQuery is ", JSON.stringify(dataQuery));
        const response = await service.search(dataQuery);

        responseHandler(response, res);

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